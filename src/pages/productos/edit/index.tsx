import { useRouter } from 'next/router'
import React from 'react'

const Index = () => {
    const router = useRouter();
    const { id } = router.query;
    if (!id) {
        setTimeout(() => {
            router.push('/productos');
        }, 10);
    }
    return (
        <div>
        </div>
    )
}

export default Index