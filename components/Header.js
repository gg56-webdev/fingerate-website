import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header>
            {/* <Image /> */}
            <nav>
                <Link href='/'>
                    <a>Home</a>
                </Link>
                <Link href='/about'>
                    <a>About</a>
                </Link>
                <Link href='/map'>
                    <a>Map</a>
                </Link>
            </nav>
        </header>
    );
}
