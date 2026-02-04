import InterviewCard from "@/components/InterviewCard"
import { Button } from "@/components/ui/button"
import { dummyInterviews } from "@/constants"
import Image from "next/image"
import Link from "next/link"

const page = () => {
  return (
    <>
    <section className="card-cta">
      <div className="flex flex-col gap-6 max-w-lg">
        <h2>Get Interview Prepped with AI</h2>
        <p className="text-lg">Practice with real interview questions and get instant feedback</p>
        <Button asChild className="btn-primary max-small:w-full">
          <Link href='/interview'>Start an Interview</Link>
        </Button>
      </div>

      <Image src='/robot.png' alt="robot" width={400} height={400} className="max-sm:hidden" />
    </section>
    <section className="flex flex-col gap-6 mt-8">
      <h2>Your Interviews</h2>

      <div className="interviews-section">
        {dummyInterviews.map((interview) => (
          <InterviewCard  {...interview} key={interview.id}/>
        ))}
        {/* <p>You have not taken any interviews yet</p> */}
      </div>
    </section>
    <section className="flex flex-col gap-6 mt-8">
      <h2>Take an Interview</h2>
      <div className="interviews-section">
        <p>There are no interviews available</p>
      </div>

    </section>
    </>
  )
}

export default page