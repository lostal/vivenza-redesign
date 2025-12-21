'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const t = useTranslations('ContactForm');

  const formSchema = z.object({
    name: z.string().min(2, { message: t('nameError') }),
    email: z.string().email({ message: t('emailError') }),
    subject: z.string().min(5, { message: t('subjectError') }),
    message: z
      .string()
      .min(10, { message: t('messageErrorMin') })
      .max(500, { message: t('messageErrorMax') }),
    consent: z.boolean().refine((value) => value === true, { message: t('consentError') }),
  });

  type ContactFormValues = z.infer<typeof formSchema>;

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      consent: false,
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate success/failure
      if (values.email.includes('error')) {
        toast({
          title: t('errorTitle'),
          description: t('errorMessage'),
          variant: 'destructive',
        });
      } else {
        setIsSuccess(true);
        toast({
          title: t('successTitle'),
          description: t('successMessage'),
        });
        form.reset();
        // Reset success state after animation
        setTimeout(() => setIsSuccess(false), 3000);
      }
    } catch {
      toast({
        title: t('unexpectedErrorTitle'),
        description: t('unexpectedErrorMessage'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Name and Email in 2-column grid on larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/80 font-medium">{t('nameLabel')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('namePlaceholder')}
                    {...field}
                    className={cn(
                      "h-12 bg-background/50 border-border/50 rounded-xl",
                      "focus:border-primary/50 focus:ring-2 focus:ring-primary/10",
                      "transition-all duration-300 placeholder:text-muted-foreground/50"
                    )}
                  />
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
                <FormLabel className="text-foreground/80 font-medium">{t('emailLabel')}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    {...field}
                    className={cn(
                      "h-12 bg-background/50 border-border/50 rounded-xl",
                      "focus:border-primary/50 focus:ring-2 focus:ring-primary/10",
                      "transition-all duration-300 placeholder:text-muted-foreground/50"
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80 font-medium">{t('subjectLabel')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('subjectPlaceholder')}
                  {...field}
                  className={cn(
                    "h-12 bg-background/50 border-border/50 rounded-xl",
                    "focus:border-primary/50 focus:ring-2 focus:ring-primary/10",
                    "transition-all duration-300 placeholder:text-muted-foreground/50"
                  )}
                />
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
              <FormLabel className="text-foreground/80 font-medium">{t('messageLabel')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('messagePlaceholder')}
                  className={cn(
                    "min-h-[140px] resize-none bg-background/50 border-border/50 rounded-xl",
                    "focus:border-primary/50 focus:ring-2 focus:ring-primary/10",
                    "transition-all duration-300 placeholder:text-muted-foreground/50"
                  )}
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
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-border/50 p-4 bg-background/30">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-0.5 border-border/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm text-foreground/80 font-normal cursor-pointer">
                  {t('consentLabel')}
                </FormLabel>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t('consentDescription')}
                </p>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className={cn(
            "w-full h-12 text-base font-medium rounded-xl",
            "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary",
            "shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30",
            "transition-all duration-300 transform hover:-translate-y-0.5",
            "disabled:opacity-70 disabled:transform-none disabled:shadow-none"
          )}
          disabled={isSubmitting || isSuccess}
        >
          <AnimatePresence mode="wait">
            {isSubmitting ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <Loader2 className="h-5 w-5 animate-spin" />
                {t('submitting')}
              </motion.span>
            ) : isSuccess ? (
              <motion.span
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 text-primary-foreground"
              >
                <CheckCircle2 className="h-5 w-5" />
                {t('successTitle')}
              </motion.span>
            ) : (
              <motion.span
                key="default"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                {t('submitButton')}
                <Send className="h-4 w-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </form>
    </Form>
  );
}
