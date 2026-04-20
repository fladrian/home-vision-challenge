import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';

interface MortgageCalculatorProps {
  price: number;
}

export const MortgageCalculator = ({ price }: MortgageCalculatorProps) => {
  const [interestRate, setInterestRate] = useState(7.0);
  const [years, setYears] = useState(30);
  const [downPaymentPct, setDownPaymentPct] = useState(20);

  const { monthlyPayment, principal, downPaymentAmt, totalInterest } = useMemo(() => {
    const downPaymentAmount = price * (downPaymentPct / 100);
    const principalAmount = price - downPaymentAmount;
    
    // Monthly interest rate
    const r = interestRate / 100 / 12;
    // Total number of payments (months)
    const n = years * 12;
    
    let monthly = 0;
    if (r === 0) {
      monthly = principalAmount / n;
    } else {
      monthly = principalAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    
    const totalPayment = monthly * n;
    const totalInterestAmount = totalPayment - principalAmount;

    return {
      monthlyPayment: isNaN(monthly) || !isFinite(monthly) ? 0 : monthly,
      principal: principalAmount,
      downPaymentAmt: downPaymentAmount,
      totalInterest: isNaN(totalInterestAmount) || !isFinite(totalInterestAmount) ? 0 : totalInterestAmount,
    };
  }, [price, interestRate, years, downPaymentPct]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <Card className="rounded-3xl border shadow-sm dark:bg-zinc-900/50">
      <CardContent className="p-6 space-y-6">
        {/* Sliders / Inputs */}
        <div className="space-y-5">
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label className="font-bold text-muted-foreground">Down Payment</Label>
              <span className="font-bold">{downPaymentPct}% ({formatCurrency(downPaymentAmt)})</span>
            </div>
            <Slider
              value={[downPaymentPct]}
              onValueChange={(val) => setDownPaymentPct(val[0])}
              max={100}
              step={1}
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <Label className="font-bold text-muted-foreground">Interest Rate</Label>
              <span className="font-bold">{interestRate.toFixed(2)}%</span>
            </div>
            <Slider
              value={[interestRate]}
              onValueChange={(val) => setInterestRate(val[0])}
              max={15}
              step={0.1}
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <Label className="font-bold text-muted-foreground">Loan Term</Label>
              <span className="font-bold">{years} Years</span>
            </div>
            <Slider
              value={[years]}
              onValueChange={(val) => setYears(val[0])}
              min={5}
              max={40}
              step={5}
            />
          </div>
        </div>

        <Separator />

        {/* Results */}
        <div className="rounded-2xl bg-zinc-100 p-5 dark:bg-zinc-800">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-sm font-bold text-muted-foreground">Estimated Payment</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-primary">{formatCurrency(monthlyPayment)}</span>
              <span className="text-xs font-bold text-muted-foreground">/mo</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-4 text-xs font-medium text-muted-foreground">
             <div className="h-2 w-1/2 bg-primary rounded-l-full" title="Principal" />
             <div className="h-2 w-1/2 bg-zinc-300 dark:bg-zinc-600 rounded-r-full" title="Interest" />
          </div>
          <div className="flex justify-between mt-2 text-xs font-bold text-muted-foreground">
             <span>Principal: {formatCurrency(principal)}</span>
             <span>Interest: {formatCurrency(totalInterest)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
