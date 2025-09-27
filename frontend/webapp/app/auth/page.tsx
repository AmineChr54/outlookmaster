"use client";

import { useRouter } from "next/navigation";
import { LoginPage } from "@/app/components/auth";

export default function LoginRoute() {
	const router = useRouter();

	const handleLogin = (credentials: any) => {
		// Minimal: derive an email string for storage
		const email = credentials?.email || credentials?.config?.username || 'user@example.com';
		try {
			localStorage.setItem('loggedInUser', email);
		} catch {}
		router.replace('/dashboard');
	};

	return <LoginPage onLogin={handleLogin} />;
}

