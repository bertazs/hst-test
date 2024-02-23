'use client';
import Hero from "@/components/Hero";
import Filters from "@/components/Filters";
import CharacterList from "@/components/CharacterList";
import StoreProvider from './StoreProvider';

export default function Home() {
  return (
      <StoreProvider>
          <section>
              <Hero
                  title="Welcome to HST Star Wars"
                  subTitle="May the force be with you"
                  classes=""
              />
              <section className="mt-10 sm:mt-20">
                  <Filters/>
              </section>
              <section>
                  <CharacterList/>
              </section>
          </section>
      </StoreProvider>
  );
}
