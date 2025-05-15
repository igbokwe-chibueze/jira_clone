//src/features/auth/components/sign-in-card.tsx

"use client"

import z from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver} from "@hookform/resolvers/zod"
import Image from "next/image";

import { signUpWithGithub, signUpWithGoogle } from "@/lib/oauth";
import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"

import { signInSchema } from "@/features/auth/schemas";
import { useSignIn } from "../api/use-signin";



const SignInCard = () => {

    const {mutate, isPending} = useSignIn();
    
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),

        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = (values: z.infer<typeof signInSchema>) => {
        mutate({json: values});
    }

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
        <CardHeader className="flex justify-center items-center text-center p-7">
            <CardTitle className="text-2xl">
                Welcome back!
            </CardTitle>
        </CardHeader>

        <div className="px-7">
            <DottedSeparator/>
        </div>

        <CardContent className="p-7">
            <Form  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email Input */}
                    <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        type="email"
                                        placeholder="Enter your email"
                                        autoComplete="email"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Password Input */}
                    <FormField
                        name="password"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button 
                        size={"lg"}
                        className="w-full"
                        disabled={isPending}
                    >
                        Sign In
                    </Button>
                </form>
            </Form>
        </CardContent>

        <div className=" px-7 ">
            <DottedSeparator/>
        </div>

        <CardContent className="p-7 flex flex-col gap-y-4">
            <Button 
                onClick={() =>signUpWithGoogle()} 
                variant={'secondary'} 
                className="w-full" 
                size={'lg'} 
                disabled={isPending}
            >
                <Image
                    src="/icons8-google.svg"
                    alt="google-icon"
                    width={20}
                    height={20}
                    className="mr-2"
                />
                Signin with Google
            </Button>

            <Button 
                onClick={() =>signUpWithGithub()} 
                variant={'secondary'} 
                className="w-full" 
                size={'lg'} 
                disabled={isPending}
            >
                <Image
                    src="/icons8-github.svg"
                    alt="github-icon"
                    width={20}
                    height={20}
                    className="mr-2"
                />
                Signin with Github
            </Button>
        </CardContent>

        <div className="px-7">
            <DottedSeparator/>
        </div>

        <CardContent className="p-7 flex items-center justify-center">
            <p> 
                Don&apos;t have an account?
                <Link href={"/sign-up"}>
                    <span className="text-blue-700 hover:underline ml-1">Sign Up</span>
                </Link>
            </p>
        </CardContent>
        
    </Card>
  );
};

export default SignInCard;
