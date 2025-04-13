"use client"

import z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver} from "@hookform/resolvers/zod"

import DottedSeparator from "@/components/dotted-separator";
import Image from "next/image";
import Link from "next/link";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
    name: z.string().trim().min(2).max(256),
    email: z.string().email(),
    password: z.string().min(6).max(256),
})

const SignUpCard = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log({ values });
    }

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
        <CardHeader className="flex flex-col justify-center items-center text-center p-7">
            <CardTitle className="text-2xl">
                Sign Up!
            </CardTitle>

            <CardDescription>
                By signing up, you agree to our{" "}
                <Link href={"/privacy"}>
                    <span> Privacy Policy</span>
                </Link>
                {" "}and{" "}
                <Link href={"/conditions"}>
                    <span>Terms & Conditions</span>
                </Link>
            </CardDescription>
        </CardHeader>

        <div className="px-7">
            <DottedSeparator/>
        </div>

        <CardContent className="p-7">
            <Form  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name Input */}
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Enter your name"
                                        autoComplete="name"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email Input */}
                    <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="Enter email address"
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
                        disabled={false}
                    >
                        Sign Up
                    </Button>
                </form>
            </Form>
        </CardContent>

        <div className=" px-7 ">
            <DottedSeparator/>
        </div>

        <CardContent className="p-7 flex flex-col gap-y-4">
            <Button variant={'secondary'} className="w-full" size={'lg'} disabled={false}>
                <Image
                    src="/icons8-google.svg"
                    alt="google-icon"
                    width={20}
                    height={20}
                    className="mr-2"
                />
                Signup with Google
            </Button>

            <Button variant={'secondary'} className="w-full" size={'lg'} disabled={false}>
                <Image
                    src="/icons8-github.svg"
                    alt="github-icon"
                    width={20}
                    height={20}
                    className="mr-2"
                />
                Signup with Github
            </Button>
        </CardContent>

        <div className="px-7">
            <DottedSeparator/>
        </div>

        <CardContent className="p-7 flex items-center justify-center">
            <p> 
                Already have an account?
                <Link href={"/sign-in"}>
                    <span className="text-blue-700 hover:underline ml-1">Sign In</span>
                </Link>
            </p>
        </CardContent>
    </Card>
  );
};

export default SignUpCard;
