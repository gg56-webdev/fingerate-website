import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function NotFound() {
    const router = useRouter();
    useEffect(() => {
        let timer = setTimeout(() => {
            router.push('/');
        }, 5000);
        return () => clearTimeout(timer);
    }, [router]);
    return <span onClick={() => router.push('/')}>Page is not found</span>;
}
