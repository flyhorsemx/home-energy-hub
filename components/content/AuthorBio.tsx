interface AuthorBioProps {
  name: string
  role: string
  avatar?: string
}

export default function AuthorBio({ name, role, avatar }: AuthorBioProps) {
  return (
    <div className="flex items-center gap-4 border-t border-gray-100 pt-6 mt-8">
      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-xl font-bold text-green-700 shrink-0">
        {avatar || name.charAt(0)}
      </div>
      <div>
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  )
}
