"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations('ContactForm');
  
  const formSchema = z.object({
    name: z.string().min(2, { message: t('nameError') }),
    email: z.string().email({ message: t('emailError') }),
    subject: z.string().min(5, { message: t('subjectError') }),
    message: z.string()
      .min(10, { message: t('messageErrorMin') })
      .max(500, { message: t('messageErrorMax') }),
    consent: z.boolean().refine(value => value === true, { message: t('consentError') }),
  });
  
  type ContactFormValues = z.infer<typeof formSchema>;

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      consent: false,
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    try {
      console.log("Form data submitted:", values);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate success/failure
      if (values.email.includes("error")) {
        toast({
          title: t('errorTitle'),
          description: t('errorMessage'),
          variant: "destructive",
        });
      } else {
        toast({
          title: t('successTitle'),
          description: t('successMessage'),
        });
        form.reset();
      }
    } catch (error) {
      toast({
        title: t('unexpectedErrorTitle'),
        description: t('unexpectedErrorMessage'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8 max-w-2xl mx-auto">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('nameLabel')}</FormLabel>
              <FormControl>
                <Input placeholder={t('namePlaceholder')} {...field} className="h-11 sm:h-12"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('emailLabel')}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={t('emailPlaceholder')} {...field} className="h-11 sm:h-12"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('subjectLabel')}</FormLabel>
              <FormControl>
                <Input placeholder={t('subjectPlaceholder')} {...field} className="h-11 sm:h-12"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('messageLabel')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('messagePlaceholder')}
                  className="min-h-[120px] sm:min-h-[150px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3 sm:p-4 shadow-sm bg-card">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm sm:text-base">
                  {t('consentLabel')}
                </FormLabel>
                <p className="text-xs text-muted-foreground">
                  {t('consentDescription')}
                </p>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full h-11 sm:h-12 text-base sm:text-lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {t('submitting')}
            </>
          ) : (
            t('submitButton')
          )}
        </Button>
      </form>
    </Form>
  );
}
