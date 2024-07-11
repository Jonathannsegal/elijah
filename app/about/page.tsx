import Link from 'next/link';
import Image from 'next/image';
import profilePic from '../../public/ElijahSegal.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Page() {
    const navItems = {
        '/': {
            name: 'home',
        },
    };

    return (
        <div className="relative snap-y snap-mandatory h-screen w-screen overflow-y-scroll flex items-center justify-center">
            <div className="absolute top-5 right-10 z-30">
                <nav
                    className="flex flex-row items-start justify-items-stretch justify-end relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
                    id="nav"
                >
                    <div className="flex flex-row space-x-0 pr-10">
                        {Object.entries(navItems).map(([path, { name }]) => {
                            return (
                                <Link
                                    key={path}
                                    href={path}
                                    className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2"
                                >
                                    {name}
                                </Link>
                            );
                        })}
                    </div>
                </nav>
            </div>
            <div className="max-w-md md:max-w-2xl w-full bg-white border rounded-xl overflow-hidden flex flex-col md:flex-row">
                <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                    <Image
                        className="object-cover h-full w-full"
                        src={profilePic}
                        alt="Profile Picture"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="p-8 flex flex-col justify-center w-full md:w-1/2">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Profession / Role</div>
                    <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Elijah Segal</a>
                    <p className="mt-2 text-gray-500">I scare children. I scare fish. I scare my sister and she tells me my head is big.</p>
                    <p className="mt-2 text-gray-500">Give me a job or I will hunt you... this is your last and only warning. Now you may be saying when did I get my first warning... And that would be a good question... But you know, you know</p>
                    <div className="mt-4 flex space-x-2">
                        <a href="#" className="text-gray-500 hover:text-black">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-black">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        <a href="#" className="text-gray-500 hover:text-black">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                    </div>
                    <div className="mt-2 text-gray-500">
                        <a href="mailto:elijeeee@elijah-segal.com">elijeeee@elijah-segal.com</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
