import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Briefcase, Home, Users, FileText, CreditCard, ChevronRight, ChevronLeft, Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
];

const steps = [
  { id: 1, name: "Personal Info", icon: User },
  { id: 2, name: "Employment", icon: Briefcase },
  { id: 3, name: "Rental History", icon: Home },
  { id: 4, name: "References", icon: Users },
  { id: 5, name: "Additional Info", icon: FileText },
  { id: 6, name: "Payment", icon: CreditCard },
];

interface FormData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  ssn: string;
  driversLicense: string;
  dlState: string;
  
  // Employment
  employerName: string;
  employerPhone: string;
  jobTitle: string;
  monthlyIncome: string;
  employmentLength: string;
  supervisorName: string;
  
  // Rental History
  currentAddress: string;
  currentCity: string;
  currentState: string;
  currentZip: string;
  currentLandlord: string;
  landlordPhone: string;
  monthlyRent: string;
  moveInDate: string;
  reasonForLeaving: string;
  
  // References
  reference1Name: string;
  reference1Phone: string;
  reference1Relationship: string;
  reference2Name: string;
  reference2Phone: string;
  reference2Relationship: string;
  
  // Additional Info
  pets: string;
  petDescription: string;
  vehicles: string;
  vehicleDescription: string;
  bankruptcy: string;
  eviction: string;
  felony: string;
  additionalNotes: string;
  
  // Payment
  agreeToTerms: boolean;
  agreeToBackgroundCheck: boolean;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  ssn: "",
  driversLicense: "",
  dlState: "",
  employerName: "",
  employerPhone: "",
  jobTitle: "",
  monthlyIncome: "",
  employmentLength: "",
  supervisorName: "",
  currentAddress: "",
  currentCity: "",
  currentState: "",
  currentZip: "",
  currentLandlord: "",
  landlordPhone: "",
  monthlyRent: "",
  moveInDate: "",
  reasonForLeaving: "",
  reference1Name: "",
  reference1Phone: "",
  reference1Relationship: "",
  reference2Name: "",
  reference2Phone: "",
  reference2Relationship: "",
  pets: "no",
  petDescription: "",
  vehicles: "no",
  vehicleDescription: "",
  bankruptcy: "no",
  eviction: "no",
  felony: "no",
  additionalNotes: "",
  agreeToTerms: false,
  agreeToBackgroundCheck: false,
};

const Apply = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const selectedPlan = location.state?.selectedPlan;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    if (!formData.agreeToTerms || !formData.agreeToBackgroundCheck) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the terms and background check authorization.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email) {
      toast({
        title: "Email Required",
        description: "Please provide your email address in Step 1.",
        variant: "destructive",
      });
      setCurrentStep(1);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-application-payment', {
        body: {
          email: formData.email,
          selectedPlan: selectedPlan,
          applicationData: formData,
        },
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Payment processing failed";
      console.error("Payment error:", errorMessage);
      toast({
        title: "Payment Error",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="text-primary" size={28} />
              <div>
                <h2 className="text-2xl font-display font-semibold">Personal Information</h2>
                <p className="text-muted-foreground">Please provide your personal details for the application.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="ssn">Social Security Number *</Label>
                <Input
                  id="ssn"
                  placeholder="XXX-XX-XXXX"
                  value={formData.ssn}
                  onChange={(e) => updateFormData("ssn", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="driversLicense">Driver's License Number *</Label>
                <Input
                  id="driversLicense"
                  value={formData.driversLicense}
                  onChange={(e) => updateFormData("driversLicense", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="dlState">DL State *</Label>
                <Select value={formData.dlState} onValueChange={(value) => updateFormData("dlState", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {US_STATES.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="text-primary" size={28} />
              <div>
                <h2 className="text-2xl font-display font-semibold">Employment Information</h2>
                <p className="text-muted-foreground">Tell us about your current employment.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employerName">Employer Name *</Label>
                <Input
                  id="employerName"
                  value={formData.employerName}
                  onChange={(e) => updateFormData("employerName", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="employerPhone">Employer Phone *</Label>
                <Input
                  id="employerPhone"
                  type="tel"
                  value={formData.employerPhone}
                  onChange={(e) => updateFormData("employerPhone", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) => updateFormData("jobTitle", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="supervisorName">Supervisor Name</Label>
                <Input
                  id="supervisorName"
                  value={formData.supervisorName}
                  onChange={(e) => updateFormData("supervisorName", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="monthlyIncome">Monthly Gross Income *</Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  placeholder="$"
                  value={formData.monthlyIncome}
                  onChange={(e) => updateFormData("monthlyIncome", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="employmentLength">Length of Employment *</Label>
                <Select value={formData.employmentLength} onValueChange={(value) => updateFormData("employmentLength", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                    <SelectItem value="1-2">1-2 years</SelectItem>
                    <SelectItem value="2-5">2-5 years</SelectItem>
                    <SelectItem value="5+">5+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Home className="text-primary" size={28} />
              <div>
                <h2 className="text-2xl font-display font-semibold">Rental History</h2>
                <p className="text-muted-foreground">Provide details about your current residence.</p>
              </div>
            </div>

            <div>
              <Label htmlFor="currentAddress">Current Address *</Label>
              <Input
                id="currentAddress"
                value={formData.currentAddress}
                onChange={(e) => updateFormData("currentAddress", e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="currentCity">City *</Label>
                <Input
                  id="currentCity"
                  value={formData.currentCity}
                  onChange={(e) => updateFormData("currentCity", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="currentState">State *</Label>
                <Select value={formData.currentState} onValueChange={(value) => updateFormData("currentState", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {US_STATES.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="currentZip">ZIP Code *</Label>
                <Input
                  id="currentZip"
                  value={formData.currentZip}
                  onChange={(e) => updateFormData("currentZip", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currentLandlord">Current Landlord Name *</Label>
                <Input
                  id="currentLandlord"
                  value={formData.currentLandlord}
                  onChange={(e) => updateFormData("currentLandlord", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="landlordPhone">Landlord Phone *</Label>
                <Input
                  id="landlordPhone"
                  type="tel"
                  value={formData.landlordPhone}
                  onChange={(e) => updateFormData("landlordPhone", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="monthlyRent">Monthly Rent *</Label>
                <Input
                  id="monthlyRent"
                  type="number"
                  placeholder="$"
                  value={formData.monthlyRent}
                  onChange={(e) => updateFormData("monthlyRent", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="moveInDate">Move-in Date *</Label>
                <Input
                  id="moveInDate"
                  type="date"
                  value={formData.moveInDate}
                  onChange={(e) => updateFormData("moveInDate", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="reasonForLeaving">Reason for Leaving</Label>
              <Textarea
                id="reasonForLeaving"
                value={formData.reasonForLeaving}
                onChange={(e) => updateFormData("reasonForLeaving", e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Users className="text-primary" size={28} />
              <div>
                <h2 className="text-2xl font-display font-semibold">References</h2>
                <p className="text-muted-foreground">Please provide two personal references (not family members).</p>
              </div>
            </div>

            <div className="p-4 bg-greenland-cream rounded-lg">
              <h3 className="font-semibold mb-4">Reference 1</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="reference1Name">Full Name *</Label>
                  <Input
                    id="reference1Name"
                    value={formData.reference1Name}
                    onChange={(e) => updateFormData("reference1Name", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="reference1Phone">Phone *</Label>
                  <Input
                    id="reference1Phone"
                    type="tel"
                    value={formData.reference1Phone}
                    onChange={(e) => updateFormData("reference1Phone", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="reference1Relationship">Relationship *</Label>
                  <Input
                    id="reference1Relationship"
                    value={formData.reference1Relationship}
                    onChange={(e) => updateFormData("reference1Relationship", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-greenland-cream rounded-lg">
              <h3 className="font-semibold mb-4">Reference 2</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="reference2Name">Full Name *</Label>
                  <Input
                    id="reference2Name"
                    value={formData.reference2Name}
                    onChange={(e) => updateFormData("reference2Name", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="reference2Phone">Phone *</Label>
                  <Input
                    id="reference2Phone"
                    type="tel"
                    value={formData.reference2Phone}
                    onChange={(e) => updateFormData("reference2Phone", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="reference2Relationship">Relationship *</Label>
                  <Input
                    id="reference2Relationship"
                    value={formData.reference2Relationship}
                    onChange={(e) => updateFormData("reference2Relationship", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="text-primary" size={28} />
              <div>
                <h2 className="text-2xl font-display font-semibold">Additional Information</h2>
                <p className="text-muted-foreground">Please answer the following questions honestly.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label>Do you have any pets? *</Label>
                <Select value={formData.pets} onValueChange={(value) => updateFormData("pets", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="yes">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.pets === "yes" && (
                <div>
                  <Label htmlFor="petDescription">Pet Description</Label>
                  <Input
                    id="petDescription"
                    placeholder="Type, breed, weight"
                    value={formData.petDescription}
                    onChange={(e) => updateFormData("petDescription", e.target.value)}
                    className="mt-1"
                  />
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label>Do you have any vehicles? *</Label>
                <Select value={formData.vehicles} onValueChange={(value) => updateFormData("vehicles", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="yes">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.vehicles === "yes" && (
                <div>
                  <Label htmlFor="vehicleDescription">Vehicle Description</Label>
                  <Input
                    id="vehicleDescription"
                    placeholder="Make, model, license plate"
                    value={formData.vehicleDescription}
                    onChange={(e) => updateFormData("vehicleDescription", e.target.value)}
                    className="mt-1"
                  />
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Have you ever filed for bankruptcy? *</Label>
                <Select value={formData.bankruptcy} onValueChange={(value) => updateFormData("bankruptcy", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="yes">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Have you ever been evicted? *</Label>
                <Select value={formData.eviction} onValueChange={(value) => updateFormData("eviction", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="yes">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Have you ever been convicted of a felony? *</Label>
                <Select value={formData.felony} onValueChange={(value) => updateFormData("felony", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="yes">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="additionalNotes">Additional Notes or Comments</Label>
              <Textarea
                id="additionalNotes"
                value={formData.additionalNotes}
                onChange={(e) => updateFormData("additionalNotes", e.target.value)}
                className="mt-1"
                rows={4}
                placeholder="Any additional information you'd like us to know..."
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="text-primary" size={28} />
              <div>
                <h2 className="text-2xl font-display font-semibold">Payment</h2>
                <p className="text-muted-foreground">Complete your application with a non-refundable application fee.</p>
              </div>
            </div>

            {selectedPlan && (
              <div className="p-4 bg-greenland-cream rounded-lg mb-6">
                <h3 className="font-semibold mb-2">Selected Floor Plan</h3>
                <p className="text-lg">{selectedPlan.name} - {selectedPlan.type}</p>
                <p className="text-muted-foreground">${selectedPlan.price}/month</p>
              </div>
            )}

            <div className="border border-border rounded-lg p-6">
              <h3 className="font-display font-semibold text-xl mb-4">Application Fee</h3>
              <div className="flex justify-between items-center mb-4">
                <span>Non-refundable application fee</span>
                <span className="text-2xl font-bold text-primary">$5.00</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                This fee covers the cost of processing your application, including credit and background checks.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => updateFormData("agreeToTerms", checked as boolean)}
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed cursor-pointer">
                    I certify that all information provided in this application is true and complete. I understand that any false or misleading information may result in denial of my application or termination of my lease. *
                  </Label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="agreeToBackgroundCheck"
                    checked={formData.agreeToBackgroundCheck}
                    onCheckedChange={(checked) => updateFormData("agreeToBackgroundCheck", checked as boolean)}
                  />
                  <Label htmlFor="agreeToBackgroundCheck" className="text-sm leading-relaxed cursor-pointer">
                    I authorize Greenland Luxury Living to conduct a credit check, criminal background check, and verify my rental and employment history. *
                  </Label>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <CreditCard size={16} />
                  You will be redirected to Stripe secure checkout to complete the $5.00 payment.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary py-12 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Application for Rent</h1>
          <p className="text-primary-foreground/80">
            {selectedPlan 
              ? `Applying for: ${selectedPlan.name} - $${selectedPlan.price}/month`
              : "Complete your rental application"}
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-greenland-cream border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-0 md:gap-2 overflow-x-auto pb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex flex-col items-center cursor-pointer transition-colors ${
                    currentStep === step.id
                      ? "text-primary"
                      : currentStep > step.id
                      ? "text-primary/60"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setCurrentStep(step.id)}
                >
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-1 transition-colors ${
                      currentStep === step.id
                        ? "bg-primary text-primary-foreground"
                        : currentStep > step.id
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check size={20} />
                    ) : (
                      <step.icon size={20} />
                    )}
                  </div>
                  <span className="text-[10px] md:text-xs text-center whitespace-nowrap">{step.name}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 md:w-16 h-0.5 mx-1 md:mx-2 ${
                      currentStep > step.id ? "bg-primary/40" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-lg">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft size={16} /> Back
                </Button>

                {currentStep < 6 ? (
                  <Button
                    onClick={nextStep}
                    className="bg-primary hover:bg-greenland-green-dark flex items-center gap-2"
                  >
                    Continue <ChevronRight size={16} />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.agreeToTerms || !formData.agreeToBackgroundCheck}
                    className="bg-primary hover:bg-greenland-green-dark flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard size={16} /> Pay $5 & Submit
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Apply;
