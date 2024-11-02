import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { nc } from "~/src/notcms/schema";

// export const maxDuration = 30;
export const revalidate = 10;

const categories = ["Blog", "Customer stories", "Changelog"].map((name, i) => ({
  id: i.toString(),
  name,
}));

type Page = typeof nc.query.blog.$inferPage;
type Writer = typeof nc.query.writers.$inferPage;

export default async function Blog() {
  let [pages] = await nc.query.blog.listPages();
  let [writers] = await nc.query.writers.listPages();

  pages = pages ?? [];
  writers = writers ?? [];

  return (
    <main className="container max-w-[1440px] px-32 mx-auto py-8">
      <div className="flex flex-col w-full items-start gap-5 flex-[0_0_auto]">
        <h2 className="self-stretch mt-[-1.00px] [font-family:'Selecta_VF_Trial-Regular',Helvetica] font-normal text-white text-5xl tracking-[0.48px] leading-[normal]">
          Recent updates
        </h2>
        <p className="self-stretch [font-family:'Selecta_VF_Trial-Light',Helvetica] font-light text-[#9f9fa4] text-[15px] tracking-[0.15px] leading-[normal]">
          This blog is maintained using NotCMS itself!
        </p>
      </div>

      <div className="flex items-center gap-12 self-stretch w-full flex-[0_0_auto]">
        <div className="inline-flex items-center gap-3 flex-[0_0_auto]">
          <button className="flex w-[71px] h-6 items-center gap-12 px-0 py-3 rounded-[24.5px] border-[0.5px] border-solid border-[#ffffff1a] [background:linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.1)_100%)]">
            <span className="inline-flex items-center justify-center gap-2 px-3 py-2 flex-[0_0_auto] mt-[-12.00px] mb-[-12.00px] rounded-[30px]">
              <span className="w-fit mt-[-1.00px] [font-family:'Selecta_VF_Trial-Regular',Helvetica] font-normal text-white text-xs tracking-[0.12px] leading-[normal] whitespace-nowrap">
                All posts
              </span>
            </span>
          </button>

          <button className="inline-flex items-center justify-center gap-2 px-3 py-0 flex-[0_0_auto]">
            <span className="w-fit mt-[-1.00px] [font-family:'Selecta_VF_Trial-Light',Helvetica] font-light text-[#9f9fa5] text-xs tracking-[0.12px] leading-[normal] whitespace-nowrap">
              Blogs
            </span>
          </button>

          <button className="inline-flex items-center justify-center gap-2 px-3 py-0 flex-[0_0_auto]">
            <span className="w-fit mt-[-1.00px] [font-family:'Selecta_VF_Trial-Light',Helvetica] font-light text-[#9f9fa5] text-xs tracking-[0.12px] leading-[normal] whitespace-nowrap">
              Customer stories
            </span>
          </button>

          <button className="inline-flex items-center justify-center gap-2 px-3 py-0 flex-[0_0_auto]">
            <span className="w-fit mt-[-1.00px] [font-family:'Selecta_VF_Trial-Light',Helvetica] font-light text-[#9f9fa5] text-xs tracking-[0.12px] leading-[normal] whitespace-nowrap">
              Changelog
            </span>
          </button>
        </div>

        <Separator className="flex-1 grow h-px" />
      </div>

      <div className="grid grid-cols-1 gap-8">
        <HeroBlogPostCard
          page={pages[0]}
          writer={writers.find(
            (w) => w.id === pages[0].properties.writers?.[0]
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pages.map((page) => {
            const writer = writers.find(
              (w) => w.id === page.properties.writers?.[0]
            );
            return <BlogPostCard key={page.id} page={page} writer={writer} />;
          })}
        </div>
      </div>
    </main>
  );
}

interface Props {
  className?: string;
  page: Omit<Page, "content">;
  writer?: Omit<Writer, "content">;
}
function HeroBlogPostCard({ className, page, writer }: Props) {
  return (
    <Link
      href={`/blog/${page.id}`}
      className="flex items-start gap-8 relative self-stretch w-full flex-[0_0_auto]"
    >
      {/* <img
        className="w-[785px] h-[422px] ml-[-0.50px] bg-black border-[#ffffff1f] relative mt-[-0.50px] mb-[-0.50px] rounded-[10px] border-[0.5px] border-solid shadow-[0px_2px_2px_-1px_#000000,0px_4px_4px_-2px_#000000]"
        alt="Key Visual"
        src={post.keyVisualImage}
      /> */}
      <Image
        src={page.properties.thumbnails?.[0] ?? "/img/404.png"}
        alt="Key Visual"
        width={785}
        height={422}
        className="rounded"
      />

      <div className="flex flex-col items-start gap-4 px-0 py-5 relative flex-1 self-stretch grow">
        <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
            <p className="text-[25px] tracking-[0.25px] relative self-stretch mt-[-1.00px] [font-family:'Selecta_VF_Trial-Regular',Helvetica] font-normal text-white leading-[normal]">
              {page.title}
            </p>
            <p className="relative self-stretch [font-family:'Selecta_VF_Trial-Light',Helvetica] font-light text-zinc-400 text-[15px] tracking-[0.15px] leading-5">
              {page.properties.description}
            </p>
          </div>
          <div className="inline-flex items-start gap-2 relative flex-[0_0_auto]">
            <div className="inline-flex h-6 items-center gap-1.5 px-3 py-0.5 relative flex-[0_0_auto] bg-[#ffffff29] rounded-[40px]">
              <div className="relative w-fit [font-family:'Selecta_VF_Trial-Light',Helvetica] font-light text-white text-[15px] tracking-[0.15px] leading-[normal] whitespace-nowrap">
                {page.properties.category}
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 pl-[3px] pr-2.5 py-[3px] relative flex-[0_0_auto] bg-[#ffffff0a] rounded-[40px] border-[0.5px] border-solid border-[#ffffff1f]">
              {/* <img
                className="w-[18px] h-[18px] relative object-cover"
                alt="Writer Profile"
                src={post.writerImage}
              /> */}
              <Image
                src={writer?.properties.images?.[0] ?? "/img/404.png"}
                alt="Writer Profile"
                width={18}
                height={18}
                className="rounded"
              />
              <div className="relative w-fit [font-family:'Selecta_VF_Trial-Light',Helvetica] font-light text-white text-[15px] tracking-[0.15px] leading-[normal] whitespace-nowrap">
                {writer?.title}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
function BlogPostCard({ className, page, writer }: Props) {
  return (
    // TODO: border?
    <Link
      href={`/blog/${page.id}`}
      className={
        "flex flex-col items-start gap-5 pt-4 pb-5 px-4 bg-[#ffffff03] rounded-3xl overflow-hidden border-[0.5px] border-solid border-transparent shadow-[inset_0px_-80px_96px_#ffffff14]"
      }
    >
      <Image
        src={page.properties.thumbnails?.[0] ?? "/img/404.png"}
        alt="Key Visual"
        width={373}
        height={201}
        className="rounded"
      />

      <div className="flex flex-col items-start gap-4 px-1.5 py-0 self-stretch w-full flex-[0_0_auto]">
        <p className="self-stretch mt-[-1px] font-h-6 font-[number:var(--h-6-font-weight)] text-white text-[length:var(--h-6-font-size)] tracking-[var(--h-6-letter-spacing)] leading-[var(--h-6-line-height)] [font-style:var(--h-6-font-style)]">
          {page.title}
        </p>

        <div className="flex items-center gap-1.5 self-stretch w-full relative flex-[0_0_auto]">
          <div className="inline-flex h-5 items-center justify-center gap-1 pl-0.5 pr-2 py-[9.5px] rounded-[66.5px] [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_100%)] relative flex-[0_0_auto]">
            {/* <img
              className="relative w-4 h-4 mt-[-7.50px] mb-[-7.50px] object-cover"
              alt="Image"
              src={post.writerImage}
            /> */}
            <Image
              src={writer?.properties.images?.[0] ?? "/img/404.png"}
              alt="Writer Profile"
              width={16}
              height={16}
              className="rounded"
            />

            <div className="relative w-fit mt-[-5.00px] mb-[-3.00px] font-caption font-[number:var(--caption-font-weight)] text-white text-[length:var(--caption-font-size)] tracking-[var(--caption-letter-spacing)] leading-[var(--caption-line-height)] whitespace-nowrap [font-style:var(--caption-font-style)]">
              {writer?.title}
            </div>
          </div>

          <div className="inline-flex h-5 items-center justify-center gap-2 pt-[9.5px] pb-[10.5px] px-2 rounded-[66.5px] [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_100%)] relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-5.50px] mb-[-3.50px] font-caption font-[number:var(--caption-font-weight)] text-white text-[length:var(--caption-font-size)] tracking-[var(--caption-letter-spacing)] leading-[var(--caption-line-height)] whitespace-nowrap [font-style:var(--caption-font-style)]">
              {page.properties.category}
            </div>
          </div>

          <div className="relative flex-1 font-caption font-[number:var(--caption-font-weight)] text-[#9f9fa5] text-[length:var(--caption-font-size)] text-right tracking-[var(--caption-letter-spacing)] leading-[var(--caption-line-height)] [font-style:var(--caption-font-style)]">
            {new Date(
              page.properties.created_at ?? Date.now()
            ).toLocaleDateString()}
          </div>
        </div>
      </div>
    </Link>
  );
}
