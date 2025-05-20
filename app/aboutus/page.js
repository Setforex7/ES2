import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="min-h-screen p-8 sm:p-20 bg-white dark:bg-black text-black dark:text-white font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-5xl mx-auto flex flex-col gap-12">
        <div className="flex items-center gap-4">
          <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={50}
            height={50}
            className="dark:invert"
          />
          <h1 className="text-4xl font-bold tracking-tight">About Us</h1>
        </div>

        <div className="text-lg leading-relaxed space-y-4">
          <p>
            Welcome to our website! We're passionate developers who love building modern web applications
            using cutting-edge technologies like <strong>Next.js</strong>, <strong>Tailwind CSS</strong>, and more.
          </p>
          <p>
            Our goal is to deliver fast, accessible, and maintainable web experiences. Whether you're just browsing,
            looking for inspiration, or seeking collaboration—you're in the right place.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Meet the Team</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            <div>
              <Image
                src="/demo1.jpg"
                alt="Team Member 1"
                width={120}
                height={120}
                className="rounded-full mx-auto object-cover aspect-square"
              />
              <p className="mt-2 font-medium underline">Guilherme Fidalgo</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Frontend Developer</p>
            </div>

            <div>
              <Image
                src="/demo2.jpg"
                alt="Team Member 2"
                width={120}
                height={120}
                className="rounded-full mx-auto object-cover aspect-square"
              />
              <p className="mt-2 font-medium underline">Rodrigo Canas</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">UI/UX Designer</p>
            </div>

            <div>
              <Image
                src="/demo3.jpg"
                alt="Team Member 3"
                width={120}
                height={120}
                className="rounded-full mx-auto object-cover aspect-square"
              />
              <p className="mt-2 font-medium underline">Tomás Rocha</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Backend Engineer</p>
            </div>

            <div>
              <Image
                src="/demo4.jpg"
                alt="Team Member 4"
                width={120}
                height={120}
                className="rounded-full mx-auto object-cover aspect-square"
              />
              <p className="mt-2 font-medium underline">Maria Luiz</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Full Stack Developer</p>
            </div>
          </div>
        </section>

        <div className="mt-8">
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </main>
    </div>
  );
}
