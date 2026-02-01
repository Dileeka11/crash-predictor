import { useNavigate } from 'react-router-dom';
import { usePrediction } from '@/context/PredictionContext';
import { Button } from '@/components/ui/button';
import SeverityCard from '@/components/results/SeverityCard';
import RiskFactorsChart from '@/components/results/RiskFactorsChart';
import Recommendations from '@/components/results/Recommendations';
import { RefreshCcw, Download, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

const Results = () => {
  const navigate = useNavigate();
  const { result, formData, resetForm } = usePrediction();

  useEffect(() => {
    if (!result) {
      navigate('/');
    }
  }, [result, navigate]);

  if (!result) {
    return null;
  }

  const handleNewPrediction = () => {
    resetForm();
    navigate('/');
  };

  const handleDownloadReport = () => {
    // Generate simple text report
    const report = `
Car Crash Severity Prediction Report
=====================================
Generated: ${new Date().toLocaleString()}

PREDICTION RESULT
-----------------
Severity: ${result.severity}
Confidence: ${Math.round(result.confidence * 100)}%

KEY RISK FACTORS
----------------
${result.riskFactors.map((f, i) => `${i + 1}. ${f.feature}: ${Math.round(f.impact * 100)}%`).join('\n')}

SAFETY RECOMMENDATIONS
----------------------
${result.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}

INPUT DATA SUMMARY
------------------
Crash Speed: ${formData.crashSpeed} km/h
Vehicle Type: ${formData.vehicleType}
Driver Age: ${formData.driverAge}
Seatbelt Used: ${formData.seatbeltUsed ? 'Yes' : 'No'}
Airbag Deployed: ${formData.airbagDeployed ? 'Yes' : 'No'}
Weather: ${formData.weatherCondition}
Road Condition: ${formData.roadCondition}

---
This is a simulated prediction for educational purposes only.
    `.trim();

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `crash-prediction-report-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] py-8">
      <div className="container max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Form
        </Button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Prediction Results</h1>
          <p className="text-muted-foreground">
            Analysis complete. Review the severity prediction and safety recommendations below.
          </p>
        </div>

        {/* Severity Card */}
        <div className="mb-8">
          <SeverityCard severity={result.severity} confidence={result.confidence} />
        </div>

        {/* Risk Factors & Recommendations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RiskFactorsChart riskFactors={result.riskFactors} />
          <Recommendations recommendations={result.recommendations} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onClick={handleDownloadReport} className="gap-2">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
          <Button onClick={handleNewPrediction} className="gap-2">
            <RefreshCcw className="h-4 w-4" />
            New Prediction
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
