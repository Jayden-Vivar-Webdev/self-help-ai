import FeedSection from "@/app/components/feed/feed";

export default function CompletedTasks(){
    return(
        <section className="grid p-10 gap-10">
            <h2 className='text-xl font-bold mb-2'>Completed Tasks</h2>
            <FeedSection />
        </section>
    )
}