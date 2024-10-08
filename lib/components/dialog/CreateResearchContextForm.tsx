"use client";
import { Button } from "@/components/button/index";
import { Input as ShadcnInput } from "@/ui/input";
import { cn } from "@/utils/utils";

import {
  Form as ShadcnForm,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

/**
 * Interface representing the input values for the onSubmit function.
 */
export interface onSubmitInputValues {
  researchContextName: string;
  researchContextDescription: string;
}

/**
 * Props for the CreateResearchContextDialog component.
 */
export interface CreateResearchContextDialogProps {
  /**
   * Callback function that will be called when the form is submitted.
   */
  onSubmit: (inputValues: onSubmitInputValues) => void;
  researchContextName?: string;
  researchContextDescription?: string;
}

/**
 * Zod schema for the form values.
 */
const formSchema = z.object({
  researchContextName: z.string().min(6, {
    message: "Name must be at least 6 characters long.",
  }),
  researchContextDescription: z.string().min(10, {
    message: "Description must be at least 10 characters long.",
  }),
});

/**
 * Create a new research context dialog
 */
export const CreateResearchContextForm = ({
  onSubmit,
  ...props
}: CreateResearchContextDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      researchContextName: props.researchContextName || "",
      researchContextDescription: props.researchContextDescription || "",
    },
  });

  const onSubmitWrapper = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  return (
    <ShadcnForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmitWrapper)}>
        <div className="flex flex-col items-center gap-medium">
          <FormField
            control={form.control}
            name="researchContextName"
            render={({ field }) => (
              <FormItem className={cn("xl:ml-9")}>
                <FormLabel>Name *</FormLabel>
                <FormControl>
                  <ShadcnInput
                    className={cn(
                      "text-neutral-900",
                      "lg:w-80",
                      "md:w-80",
                      "sm:items-center",

                      form.formState.errors.researchContextName
                        ? "border-error-500"
                        : "border-neutral-300",
                    )}
                    placeholder="Enter a name for the research context"
                    {...field}
                  />
                </FormControl>
                <FormMessage className={cn("text-error-500")} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="researchContextDescription"
            render={({ field }) => (
              <FormItem className={cn("xl:ml-9")}>
                <FormLabel>Description *</FormLabel>
                <FormControl>
                  <ShadcnInput
                    className={cn(
                      "text-neutral-900 ",
                      "lg:w-80",
                      "md:w-80",

                      form.formState.errors.researchContextDescription
                        ? "border-error-500"
                        : "border-neutral-300",
                    )}
                    placeholder="Enter a description for the research context"
                    {...field}
                  />
                </FormControl>
                <FormMessage className={cn("text-error-500 ")} />
              </FormItem>
            )}
          />
          <div className={cn("text-center")}>
            <Button
              className=""
              variant="default"
              size="default"
              label="Create new research context"
              type="submit"
            />
          </div>
        </div>
      </form>
    </ShadcnForm>
  );
};
