
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { RegisterSchema } from '@/zod/schemas/auth.schema';
import { RegisterType } from '@/zod/types/auth.type';

import { TypographyH2, TypographyP } from '@/components/typography';
import { CustomInput } from '@/components/custom-input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, XIcon } from 'lucide-react';
import { passwordStrength } from "check-password-strength";
import { toast } from 'sonner';
import { PassStrength } from '@/components/pass-strength';
import { Button } from '@/components/ui/button';
import { registerAction } from '@/actions/auth.action';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries, provinces } from '@/components/countries';

const steps = [
  {
    id: 'Step 1',
    name: 'Personal Info',
    fields: ['first_name', 'last_name', 'email', 'phone', 'identity_number'],
  },
  {
    id: 'Step 2',
    name: 'Address',
    fields: ['street', 'city', 'province', 'country', 'zip']
  },
  {
    id: 'Step 3',
    name: 'Security Information',
    fields: ['password', 'confirm_password'],
  },
  { id: 'Step 4', name: 'Complete' },
];

export function UserRegisterForm() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [passStrength, setPassStrength] = useState<number>(0);

  const delta = currentStep - previousStep;

  const form = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
  });

  const passwordValue = form.watch().password;

  useEffect(() => {
    setPassStrength(passwordStrength(passwordValue).id);
  }, [passwordValue]);

  const { push } = useRouter();

  const processForm: SubmitHandler<RegisterType> = async (data) => {
    console.log(data);

    const res = await registerAction(data);

    if (res?.error) {
      toast.error(res?.error);
    }
    else {
      toast.success(res?.success);
      push('/');
    }

  };

  type FieldName = keyof RegisterType;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    // Move to the next step if we are not at the last step
    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }

    // On the last step, submit the form
    if (currentStep === steps.length - 1) {
      await form.handleSubmit(processForm)();  // Submit the form
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const handleClickedStep = async (index: number) => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as FieldName[], { shouldFocus: true });

    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }

    if (!output) return;

    setCurrentStep(index);
  };

  return (
    <div className='absolute inset-0 bg-background dark:bg-background flex flex-col justify-center px-2 md:p-24 z-10'>
      <div
        className='absolute top-4 right-4 flex flex-col justify-center items-center p-2 bg-lighterBackground transition-all transform hover:scale-105 hover:bg-blue-400 dark:hover:bg-blue-600 hover:text-background dark:hover:text-background cursor-pointer rounded-full'
        onClick={() => push('/')}>
        <XIcon className='w-6 h-6' />
      </div>

      {/* Steps Navigation */}
      <div className='lg:w-3/4 mx-auto'>
        <nav aria-label='Progress' className='hidden md:block'>
          <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
            {steps.map((step, index) => (
              <li key={step.name} className='md:flex-1 cursor-pointer transition-all transform hover:scale-105' onClick={() => handleClickedStep(index)}>
                {currentStep > index ? (
                  <div className='group flex w-full flex-col border-l-4 border-blue-400 dark:border-blue-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                    <span className='text-sm font-medium text-blue-400 dark:text-blue-600 transition-colors '>{step.id}</span>
                    <span className='text-sm font-medium'>{step.name}</span>
                  </div>
                ) : currentStep === index ? (
                  <div className='flex w-full flex-col border-l-4 border-blue-400 dark:border-blue-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4' aria-current='step'>
                    <span className='text-sm font-medium text-blue-400 dark:text-blue-600'>{step.id}</span>
                    <span className='text-sm font-medium'>{step.name}</span>
                  </div>
                ) : (
                  <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                    <span className='text-sm font-medium text-gray-500 transition-colors'>{step.id}</span>
                    <span className='text-sm font-medium'>{step.name}</span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Form */}
        <Form {...form}>
          <form className='mt-12 py-12' id='user-register-submit' onSubmit={form.handleSubmit(processForm)}>
            {/* Step 1: Personal Info */}
            {currentStep === 0 && (
              <motion.div initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
                <TypographyH2>Personal Info</TypographyH2>
                <TypographyP>Provide your personal information.</TypographyP>
                <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                  <div className='sm:col-span-3'>
                    <div className='mt-2'>
                      <CustomInput name='first_name' control={form.control} label='First Name' placeholder='First Name' type='text' />
                    </div>
                  </div>

                  <div className='sm:col-span-3'>
                    <div className='mt-2'>
                      <CustomInput name='last_name' control={form.control} label='Last Name' placeholder='Last Name' type='text' />
                    </div>
                  </div>

                  <div className='sm:col-span-3'>
                    <div className='mt-2'>
                      <CustomInput name='identity_number' control={form.control} label='Identity Number' placeholder='Identity Number' type='text' />
                    </div>
                  </div>

                  <div className='sm:col-span-3'>
                    <div className='mt-2'>
                      <CustomInput name='date_of_birth' control={form.control} label='Date of Birth' placeholder='Date of Birth' type='date' />
                    </div>
                  </div>

                  <div className='sm:col-span-3'>
                    <div className='mt-2'>
                      <CustomInput name='phone' control={form.control} label='Phone' placeholder='Phone' type='tel' />
                    </div>
                  </div>

                  <div className='sm:col-span-3'>
                    <div className='mt-2'>
                      <CustomInput name='email' control={form.control} label='Email' placeholder='Email' type='email' />
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* Step 2: Address */}
            {currentStep === 1 && (
              <motion.div initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
                <TypographyH2>Address</TypographyH2>
                <TypographyP>Provide your address.</TypographyP>
                <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                  <div className='sm:col-span-3'>
                    <div className='mt-2'>
                      <CustomInput name='street' control={form.control} label='Street' placeholder='Street' type='text' />
                    </div>
                  </div>

                  <div className='sm:col-span-3'>
                    <div className='mt-2'>
                      <CustomInput name='city' control={form.control} label='City' placeholder='City' type='text' />
                    </div>
                  </div>

                  <div className='sm:col-span-3'>
                    <div className='mt-2'>
                      <FormField
                        control={form.control}
                        name="province"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Province</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={(value) => {
                                  console.log('Selected Province:', value);
                                  field.onChange(value)
                                }}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="w-full border-0 border-b-2 border-foreground dark:border-foreground rounded-none">
                                  <SelectValue placeholder="Select Province" />
                                </SelectTrigger>
                                <SelectContent>
                                  {provinces.map((item) => (
                                    <SelectItem key={item.code} value={item.name}>
                                      {item.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-3'>
                    <div className='mt-2'>
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={(value) => {
                                  console.log('Selected Country:', value);
                                  field.onChange(value)
                                }}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="w-full border-0 border-b-2 border-foreground dark:border-foreground rounded-none">
                                  <SelectValue placeholder="Select Country" />
                                </SelectTrigger>
                                <SelectContent>
                                  {countries.map((item) => (
                                    <SelectItem key={item.code} value={item.name}>
                                      {item.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-3'>
                    <div className='mt-2'>
                      <CustomInput name='zip' control={form.control} label='Zip' placeholder='Zip' type='text' />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Security Information */}
            {currentStep === 2 && (
              <motion.div initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
                <TypographyH2>Security Information</TypographyH2>
                <TypographyP>Create a secure password.</TypographyP>
                <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                  <div className='sm:col-span-3'>
                    <div className='mt-2'>
                      <CustomInput name='password' control={form.control} label='Password' placeholder='Password' type='password' />
                    </div>
                  </div>

                  <div className='sm:col-span-3'>
                    <div className='mt-2'>
                      <CustomInput name='confirm_password' control={form.control} label='Confirm Password' placeholder='Confirm Password' type='password' />
                    </div>
                  </div>
                </div>
                <PassStrength passStrength={passStrength} />
              </motion.div>
            )}

            {/* Step 4: Completion */}
            {currentStep === 3 && (
              <motion.div initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
                <TypographyH2>Complete</TypographyH2>
                <TypographyP>Thank you for completing the registration form. Click below to finish.</TypographyP>
              </motion.div>
            )}
          </form>

          {/* Action Buttons */}
          <div className='flex justify-between mt-8'>
            <Button variant='secondary' type='button' className='bg-blue-400 dark:bg-blue-600 text-background dark:text-background' onClick={prev} disabled={currentStep === 0}>
              <ArrowLeftIcon className='w-6 h-6' />
              Back
            </Button>
            <Button variant='secondary' type='button' className='bg-blue-400 dark:bg-blue-600 text-background dark:text-background hover:bg-blue-400 dark:hover:bg-blue-600' onClick={next}>
              {currentStep === steps.length - 1 ? (
                <CheckIcon className='w-6 h-6' />
              ) : (
                <>
                  Next
                  <ArrowRightIcon className='w-6 h-6' />
                </>
              )}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
