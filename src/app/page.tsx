import { createClient } from "@/lib/supabase/server";
import BarChart from "@/modules/common/components/BarChart"
import CustomPieChart from "@/modules/common/components/PieChart";


export default async function Home() {

  const supabase = createClient();
  const techJobs = await supabase.rpc('get_distinct_technologies_with_count').select('*')
  const jobsExperience = await supabase.rpc('get_job_counts_by_experience').select('*')
  const jobsByExperience = jobsExperience.data?.map(({ job_count, experience_years: years }) => {
    // Determine the proper label based on the years value
    const yearLabel = years % 1 === 0  // Check if the value is a whole number
      ? years === 1 
        ? `${years} Year` 
        : `${years} Years` 
      : `${years} Years`; // Treat decimals as "Years" for simplicity

    return {
      job_count,
      experience_years: yearLabel
    };
  });
  const jobsEnglishLevel = await supabase.rpc('get_job_counts_by_english_level').select('*')

    

  if(jobsExperience.error || techJobs.error || jobsEnglishLevel.error) {
    return (
      <pre className="border border-red-400 rounded-lg p-2">{JSON.stringify([jobsExperience.error, techJobs.error, jobsEnglishLevel.error], null, 2)}</pre>
    )
  }

  return (
    <section className="flex flex-col flex-1 min-h-0 px-8 py-4 gap-4">
      <div className="h-full grid grid-flow-rows lg:grid-cols-4 lg:grid-rows-4 gap-4">

        <div className="gradient-card h-full p-4 flex row-span-4 col-span-2 rounded-xl">
          <div className="flex-1 flex flex-col">
            <h4 className="text-chart-2 mb-2 uppercase">Jobs by technology</h4>
            <div className="max-w-screen-md flex-1 min-h-0">
              <BarChart data={techJobs.data || []} dataKey='technology_count' nameKey='name'/>
            </div>
          </div>
            
          <div className="flex-1 flex flex-col">
            <h4 className="text-chart-2 mb-2 uppercase">Jobs by years of experience</h4>
            <div className=" flex-1 min-h-0">
              <BarChart data={jobsByExperience || []} dataKey='job_count' nameKey="experience_years"/>
            </div>
          </div>
        </div>

        <div className="gradient-card h-full p-4 flex flex-col row-span-2 col-span-2 rounded-xl">
          <h4 className="text-chart-2 mb-2 uppercase">Jobs by english level</h4>
          <div className=" flex-1 min-h-0">
            <CustomPieChart data={jobsEnglishLevel.data || []} dataKey='job_count' nameKey='english_level'/>
          </div>
        </div>
      </div>

      
    </section>
  );
}
