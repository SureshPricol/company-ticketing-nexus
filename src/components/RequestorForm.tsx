
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { requestOptions, mediumOptions, formDataMapping } from '@/data/formData';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  request: z.string().min(1, 'Request type is required'),
  medium: z.string().min(1, 'Medium is required'),
  typeOfContent: z.string().min(1, 'Type of content is required'),
  reason: z.string().min(10, 'Reason must be at least 10 characters'),
  additionalSpecs: z.string().optional(),
  roiExpected: z.string().min(1, 'ROI Expected is required'),
  requiredDate: z.string().min(1, 'Required date is required'),
});

type FormData = z.infer<typeof formSchema>;

export function RequestorForm() {
  const [selectedRequest, setSelectedRequest] = useState<string>('');
  const [selectedMedium, setSelectedMedium] = useState<string>('');
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      request: '',
      medium: '',
      typeOfContent: '',
      reason: '',
      additionalSpecs: '',
      roiExpected: '',
      requiredDate: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    toast({
      title: "Request Submitted",
      description: "Your request has been submitted successfully and is pending approval.",
    });
    form.reset();
    setSelectedRequest('');
    setSelectedMedium('');
  };

  const availableMediums = selectedRequest ? mediumOptions[selectedRequest as keyof typeof mediumOptions] || [] : [];
  const availableContentTypes = (selectedRequest && selectedMedium) 
    ? formDataMapping[selectedRequest as keyof typeof formDataMapping]?.[selectedMedium as keyof typeof formDataMapping[keyof typeof formDataMapping]] || []
    : [];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Request</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="request"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Request *</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedRequest(value);
                        setSelectedMedium('');
                        form.setValue('medium', '');
                        form.setValue('typeOfContent', '');
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select request type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {requestOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="medium"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medium *</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedMedium(value);
                        form.setValue('typeOfContent', '');
                      }}
                      value={field.value}
                      disabled={!selectedRequest}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select medium" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableMediums.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="typeOfContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Content *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!selectedMedium}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select content type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableContentTypes.map((content) => (
                          <SelectItem key={content} value={content}>
                            {content}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Requirement *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please explain the reason for this request..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="additionalSpecs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Specifications</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional specifications or requirements..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="roiExpected"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ROI Expected *</FormLabel>
                    <FormControl>
                      <Input placeholder="Expected return on investment" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requiredDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Required Date *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => form.reset()}>
                Reset
              </Button>
              <Button type="submit">
                Submit Request
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
