"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react";
export default function Login(){
    const router = useRouter();

    useEffect(() => {
        router.replace('/i/login');
    }, []);
    return null
}