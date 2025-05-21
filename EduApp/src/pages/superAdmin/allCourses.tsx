function AllCourses () {
    return (
        <div>
            <div className="w-full bg-white rounded-lg md:p-10 p-4">
                <div className="md:text-2xl text-sm font-semibold text-[#309898]">All Courses</div>
                <div>
                    <table className="w-full mt-4 text-[#6B7C93] border border-[#D9E2EC] md:text-lg text-sm">
                        <thead>
                            <tr>
                                <th className="py-2">Course Name</th>
                                <th className="py-2">Edu Ad Name</th>
                                <th className="py-2">Category</th>
                                <th className="py-2">Subject</th>
                            </tr>
                        </thead>
                        </table>
                </div>
            </div>
        </div>
    )
}

export default AllCourses;