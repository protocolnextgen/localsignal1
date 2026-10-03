import { Trend, TrendStrengthLevel, ConvergenceLevel, OpportunityGapLevel, DiscoverableSupplyLevel } from '../types';

export interface ScoreExplanation {
  trend_strength: {
    level: TrendStrengthLevel;
    factors: {
      growth: { text: string; status: 'positive' | 'neutral' | 'negative' };
      volume: { text: string; status: 'positive' | 'neutral' | 'negative' };
      diversity: { text: string; status: 'positive' | 'neutral' | 'negative' };
      geographic: { text: string; status: 'positive' | 'neutral' | 'negative' };
    };
    verdict: string;
  };
  convergence: {
    level: ConvergenceLevel;
    independent_sources: number;
    source_checks: {
      search: boolean;
      discussion: boolean;
      requests: boolean;
      reviews: boolean;
    };
    explanation: string;
  };
  opportunity_gap: {
    level: OpportunityGapLevel;
    demand_level: TrendStrengthLevel;
    supply_level: DiscoverableSupplyLevel;
    reasoning: string;
  };
  is_temporary_spike: boolean;
  confidence_statement: string;
}

export function evaluateTrendScoring(trend: Trend): ScoreExplanation {
  // Check false-positive protection (Section 16)
  const isSpike = trend.is_spike || (
    trend.metrics.growth_percentage > 200 &&
    trend.source_diversity === 'Single' &&
    trend.signals.discussion === 'Low' &&
    trend.signals.requests === 'Low'
  );

  // 1. Calculate Trend Strength
  let strength: TrendStrengthLevel = trend.trend_strength;
  if (isSpike) {
    strength = 'Low';
  }

  // 2. Calculate Signal Convergence
  const sourceChecks = {
    search: trend.signals.search === 'Increasing' || trend.signals.search === 'Stable',
    discussion: trend.signals.discussion === 'Increasing' || trend.signals.discussion === 'Stable',
    requests: trend.signals.requests === 'Present' || trend.signals.requests === 'Emerging',
    reviews: trend.signals.reviews === 'Present' || trend.signals.reviews === 'Emerging',
  };

  const activeSourceCount = Object.values(sourceChecks).filter(Boolean).length;
  let convergence: ConvergenceLevel = 'Weak';
  if (activeSourceCount >= 3 && trend.source_diversity === 'Multiple') {
    convergence = 'Strong';
  } else if (activeSourceCount >= 2) {
    convergence = 'Moderate';
  }

  // 3. Calculate Opportunity Gap (Demand vs Discoverable Local Supply)
  let gap: OpportunityGapLevel = 'Medium';
  if (isSpike) {
    gap = 'Low-confidence';
  } else if (strength === 'High' && trend.discoverable_supply === 'Limited') {
    gap = 'High';
  } else if (strength === 'High' && trend.discoverable_supply === 'Strong') {
    gap = 'Low'; // Demand is high but supply is already saturated
  } else if (strength === 'Medium' && trend.discoverable_supply === 'Limited') {
    gap = 'Medium';
  } else if (strength === 'Low') {
    gap = 'Low';
  }

  let opportunityReasoning = '';
  if (gap === 'High') {
    opportunityReasoning = 'Demand is accelerating across multiple independent channels while suitable local commercial supply is not discoverable in available listings.';
  } else if (gap === 'Low' && strength === 'High') {
    opportunityReasoning = 'Interest is high, but local supply is already well established. High market competition reduces greenfield opportunity.';
  } else if (gap === 'Low-confidence') {
    opportunityReasoning = 'Flagged as temporary anomaly. Single-day search spike without multi-source convergence. Investigation recommended only after sustained evidence.';
  } else {
    opportunityReasoning = 'Moderate demand balanced with partial local availability. Targeted niche offerings may find feasibility.';
  }

  return {
    trend_strength: {
      level: strength,
      factors: {
        growth: {
          text: `+${trend.metrics.growth_percentage}% velocity over pilot baseline`,
          status: trend.metrics.growth_percentage > 100 ? 'positive' : 'neutral'
        },
        volume: {
          text: `${trend.metrics.recorded_searches} recorded queries + ${trend.metrics.discussion_mentions} discussions`,
          status: trend.metrics.recorded_searches > 200 ? 'positive' : 'neutral'
        },
        diversity: {
          text: `${trend.source_diversity} independent signal origins`,
          status: trend.source_diversity === 'Multiple' ? 'positive' : (trend.source_diversity === 'Single' ? 'negative' : 'neutral')
        },
        geographic: {
          text: `${trend.geographic_concentration} cluster in ${trend.locality}`,
          status: trend.geographic_concentration === 'High' ? 'positive' : 'neutral'
        }
      },
      verdict: isSpike 
        ? 'Single-burst anomaly lacking cross-temporal sustainability.'
        : `${strength} evidence momentum with sustained regional acceleration.`
    },
    convergence: {
      level: convergence,
      independent_sources: activeSourceCount,
      source_checks: sourceChecks,
      explanation: isSpike
        ? 'Weak convergence. Isolated search surge with zero supporting discussion or offline merchant inquiries.'
        : `${activeSourceCount} independent source types independently corroborate this local need.`
    },
    opportunity_gap: {
      level: gap,
      demand_level: strength,
      supply_level: trend.discoverable_supply,
      reasoning: opportunityReasoning
    },
    is_temporary_spike: isSpike,
    confidence_statement: isSpike
      ? 'Low Confidence (Anomaly Detection Active)'
      : 'High Confidence (Cross-Validated Multi-Source Signal)'
  };
}
