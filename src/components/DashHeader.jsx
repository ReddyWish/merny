import useCurrentUser from "../hooks/useCurrentUser.js";

const DashHeader = () => {
  const currentUser = useCurrentUser();
  const token = currentUser.token
  const name = currentUser.name
  const editor = currentUser.editor
  const admin = currentUser.admin
  let content
  if (!token) {
    content = (
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Talk</h2>
            <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Share your daily thoughts and ideas with us</p>
          </div>
        </div>
      </section>
    )
  } else {
    content =  admin ? (<section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
              <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Talk</h2>
              <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Welcome {name}! As an Admin, you wield the power to shape and guide our platform with wisdom and authority. Uphold the principles of fairness, inclusivity, and transparency while leading by example. Your decisions carry significant impact, and with great power comes great responsibility. Empower and support our team, fostering an environment of collaboration and growth as we strive for excellence. </p>
            </div>
          </div>
        </section>) : editor ? (<section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Talk</h2>
            <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Welcome {name}! Embrace the role of an editor with responsibility and diligence, ensuring the highest standards of accuracy, clarity, and creativity in every piece of content you touch. Let your discerning eye and editorial finesse elevate our work to new heights. </p>
          </div>
        </div>
      </section>) : ( <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Talk</h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Welcome {name}! Inspire yourself and others </p>
        </div>
      </div>
    </section>)
      }
  return content;
}

export default DashHeader;