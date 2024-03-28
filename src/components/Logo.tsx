import Image from 'next/image'

export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <div className="mt-4">
      <Image src={'/tbfull.svg'} alt={''} height={100} width={100} />
    </div>
  )
}
