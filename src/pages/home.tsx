import { useSelector } from "react-redux";
import type { store } from "../redux/store";
import Footer from "../components/footer/footer";

type RootState = ReturnType<typeof store.getState>;

function Home() {
  
  const lettuce = useSelector((state: RootState) => state.burger.lettuce);
  const bacon = useSelector((state: RootState) => state.burger.bacon);
  const cheese = useSelector((state: RootState) => state.burger.cheese);
  const meat = useSelector((state: RootState) => state.burger.meat);

  return (
    <>
      <div className="h-[300px] overflow-y-auto">
        <div className="flex flex-col items-center py-10 min-h-[300px]">
          <div className="h-16 w-80 bg-gradient-to-t from-[#e27b36] to-[#bc581e] rounded-t-full mb-2" />
          {lettuce === 0 && bacon === 0 && cheese === 0 && meat === 0 && (
            <div className="py-4 font-bold text-xl">No Ingredients Added</div>
          )}
          {/* Lettuce */}
          {Array(lettuce).fill(null).map((_, index) => (
              <div
                key={`lettuce-${index}`}
                className="h-7 w-90 bg-gradient-to-t from-[#91ce50] to-[#228c1d] rounded-4xl mb-2"
              />
            ))}

          {/* Bacon */}
          {Array(bacon).fill(null).map((_, index) => (
              <div
                key={`bacon-${index}`}
                className="h-3 w-80 bg-[#c14621] mb-2"
              />
            ))}

          {/* Cheese */}
          {Array(cheese).fill(null).map((_, index) => (
              <div
                key={`cheese-${index}`}
                className="h-5 w-95 bg-gradient-to-t from-[#d6bb22] to-[#f4d004] rounded-4xl mb-2"
              />
            ))}

          {/* Meat */}
          {Array(meat).fill(null).map((_, index) => (
              <div
                key={`meat-${index}`}
                className="h-7 w-80 bg-[#783206] rounded-4xl mb-2"
              />
            ))}

          {/* Bottom bun */}
          <div className="h-12 w-80 bg-gradient-to-t from-[#e27b36] to-[#f08e4a] rounded-b-4xl" />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
