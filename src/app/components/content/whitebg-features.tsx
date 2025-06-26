import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

export default function features() {
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl lg:flex lg:justify-between lg:px-8 xl:justify-end">
        <div className="lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2">
          <div className="relative h-80 lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0">
            <img
              alt=""
              src="/images/fitness-portriate.png"
              className="absolute inset-0 size-full bg-gray-50 object-cover"
            />
          </div>
        </div>
        <div className="px-6 lg:contents">
          <div className="mx-auto max-w-2xl pt-16 pb-24 sm:pt-20 sm:pb-32 lg:mr-0 lg:ml-8 lg:w-full lg:max-w-lg lg:flex-none lg:pt-32 xl:w-1/2">
            <p className="text-base/7 font-semibold text-indigo-600">Train Smart</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              An Optimised Personal Solution
            </h1>
            <p className="mt-6 text-xl/8 text-gray-700">
            Nexian is your personal AI fitness companion designed to help you achieve 
            your health goals with expert support and smart technology. 
            Whether you&apos;re aiming to lose weight, build muscle, or improve endurance, 
            Nexian adapts to your needs by generating personalized workout plans, 
            tracking your progress, and offering real time motivation and advice. 
            It’s like having a world class trainer in your pocket—ready to guide,
             encourage, and grow with you every step of the way.
            </p>
            <div className="mt-10 max-w-xl text-base/7 text-gray-700 lg:max-w-none">
              <p>
              Powered by AI, Nexian intelligently adjusts your training plan based 
              on your performance and feedback, ensuring you&apos;re always challenged, 
              never overwhelmed. Whether you train at home or in the gym, it personalises 
              every session to fit your equipment and lifestyle. From tracking progress 
              to offering recovery tips, Nexian keeps you focused, motivated, and on 
              track, because real progress starts with consistency and the right support.
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <CloudArrowUpIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />
                <span>
                    <strong className="font-semibold text-gray-900">Smart workout generation.</strong> Instantly generate personalized training plans based on your goals, experience, and available equipment—no guesswork needed.
                </span>
                </li>
                <li className="flex gap-x-3">
                <LockClosedIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />
                <span>
                    <strong className="font-semibold text-gray-900">Private & secure data.</strong> Your fitness profile, history, and health data are encrypted and never shared—your progress stays private.
                </span>
                </li>
                <li className="flex gap-x-3">
                <ServerIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />
                <span>
                    <strong className="font-semibold text-gray-900">Auto progress tracking.</strong> Every session is logged automatically, allowing you to review progress, adjust intensity, and celebrate milestones.
                </span>
                </li>

              </ul>
              <p className="mt-8">
                Your journey to better health doesn’t need complicated systems 
                or bulky equipment. Nexian simplifies fitness by delivering smart, 
                personalized guidance directly to your device—anytime, anywhere. 
                Whether you&apos;re working out at home or on the go, 
                you&apos;re always supported.
                </p>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">No gym? No problem.</h2>
                <p className="mt-6">
                Nexian adapts to your environment at home, outdoors, or in the gym. 
                With intelligent workout plans and real-time coaching, you&apos;ll 
                get effective training without needing access to special equipment. 
                Just set your goals, and Nexian helps you get there step by step, 
                with confidence.
                </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
