import Link from 'next/link';

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}){
    return(
        <div className="mb-10">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
            {paragraph} {' '}
            <Link href={linkUrl} className="font-medium text-lime-600 hover:text-lime-500">
                {linkName}
            </Link>
            </p>
        </div>
    )
}