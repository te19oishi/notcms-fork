"use client";
import Image from "next/image";
import * as React from "react";
import sal from "sal.js";

import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { GradientSeparator, Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";
import {
  Section,
  SectionHeader,
  SectionPreTitle,
  SectionTitle,
} from "./_section";

export function HowWorks() {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    sal();
  }, []);

  return (
    <Section
      data-sal-threshold="0.5"
      style={{
        background: `
          radial-gradient(35% 25.52% at 50% 36.46%, rgba(255, 255, 255, 0.06) 0%, rgba(15, 15, 17, 0) 100%),
          radial-gradient(35% 27.17% at 50% 61.19%, rgba(255, 255, 255, 0.06) 0%, rgba(15, 15, 17, 0) 100%)
        `,
      }}
    >
      <SectionHeader>
        <SectionPreTitle>How it works</SectionPreTitle>
        <SectionTitle>
          Complete customization
          <br />
          across every layer
        </SectionTitle>
      </SectionHeader>
      <div className="flex flex-col items-center w-full">
        {/* 1 */}
        <Layer
          className="z-50"
          style={{ "--sal-delay": "100ms" } as React.CSSProperties}
        >
          <LayerImage>
            <Image
              src="/img/home/lp-3-how-works-1-website.png"
              width={256}
              height={148}
              alt="Website"
            />
          </LayerImage>
          <LayerHeader direction="right">
            <LayerTitle>
              <span className="md:hidden inline-block">1</span>
              <span className="hidden md:inline-block">Your Website</span>
            </LayerTitle>
            <Separator className="bg-white opacity-[0.12] my-3" />
            <LayerDescription className="hidden md:block">
              Deploy your website to the edge with Vercel, Netlify, or any other
              static site host.
            </LayerDescription>
          </LayerHeader>
        </Layer>
        {/* 2 */}
        <Layer
          className="z-40"
          style={{ "--sal-delay": "200ms" } as React.CSSProperties}
        >
          <LayerHeader direction="left">
            <LayerTitle>
              <span className="md:hidden inline-block">2</span>
              <span className="hidden md:inline-block">Website codebase</span>
            </LayerTitle>
            <Separator className="bg-white opacity-[0.12] my-3" />
            <LayerDescription className="hidden md:block">
              Build your website with your design and your favorite frontend
              framework, like Next.js or Vue.
            </LayerDescription>
          </LayerHeader>
          <LayerImage>
            <Image
              src="/img/home/lp-3-how-works-2-codebase.png"
              width={256}
              height={148}
              alt="API"
            />
          </LayerImage>
        </Layer>
        <span ref={ref} />
        {/* 3 */}
        <Layer
          className="z-30"
          style={{ "--sal-delay": "300ms" } as React.CSSProperties}
        >
          <LayerImage>
            <Image
              src="/img/home/lp-3-how-works-3-api.png"
              width={256}
              height={148}
              alt="API"
            />
          </LayerImage>
          <LayerHeader direction="right">
            <LayerTitle>
              <span className="md:hidden inline-block">3</span>
              <span className="hidden md:inline-block">NotCMS API</span>
            </LayerTitle>
            <Separator className="bg-white opacity-[0.12] my-3" />
            <LayerDescription className="hidden md:block">
              Leverage the power of NotCMS's fast API. Retrieve your content
              with typed queries.
            </LayerDescription>
          </LayerHeader>
        </Layer>
        {/* 4 */}
        <Layer
          className="z-20"
          style={{ "--sal-delay": "400ms" } as React.CSSProperties}
        >
          <LayerHeader direction="left">
            <LayerTitle>
              <span className="md:hidden inline-block">4</span>
              <span className="hidden md:inline-block">NotCMS Dashboard</span>
            </LayerTitle>
            <Separator className="bg-white opacity-[0.12] my-3" />
            <LayerDescription className="hidden md:block">
              Manage your databases with a powerful and intuitive dashboard,
              with features like version history.
            </LayerDescription>
          </LayerHeader>
          <LayerImage>
            <Image
              src="/img/home/lp-3-how-works-4-dashboard.png"
              width={256}
              height={148}
              alt="NotCMS Dashboard"
            />
          </LayerImage>
        </Layer>
        {/* 5 */}
        <Layer
          className="z-10 mb-0"
          style={{ "--sal-delay": "500ms" } as React.CSSProperties}
        >
          <LayerImage>
            <Image
              src="/img/home/lp-3-how-works-5-editor.png"
              width={256}
              height={148}
              alt="Notion editor / database"
            />
          </LayerImage>
          <LayerHeader direction="right">
            <LayerTitle>
              <span className="md:hidden inline-block">5</span>
              <span className="hidden md:inline-block">
                Notion editor / database
              </span>
            </LayerTitle>
            <Separator className="bg-white opacity-[0.12] my-3" />
            <LayerDescription className="hidden md:block">
              Edit your content in Notion, and sync it to your website with a
              few click.
            </LayerDescription>
          </LayerHeader>
        </Layer>
        <HorizontalLayerDescription />
      </div>
    </Section>
  );
}

const Layer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "grid grid-cols-[1fr_auto_1fr] gap-1 w-full -mb-[45px]",
      className
    )}
    data-sal="slide-up"
    data-sal-duration="900"
    data-sal-easing="ease-in-quint"
    data-sal-threshold="1"
    style={{ "--sal-transform": "translateY(200%)" } as React.CSSProperties}
    {...props}
  />
));
Layer.displayName = "Layer";

const LayerImage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("col-start-2", className)} {...props} />
));
LayerImage.displayName = "LayerImage";

interface LayerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  direction: "left" | "right";
}
const LayerHeader = React.forwardRef<HTMLDivElement, LayerHeaderProps>(
  ({ className, direction, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mt-[40px] flex flex-col",
        direction === "right" ? "col-start-3" : "col-start-1",
        direction === "right" ? "pr-8 text-right" : "pl-8 left-0",
        direction === "right" ? "items-end" : "items-start",
        className
      )}
      {...props}
    />
  )
);
LayerHeader.displayName = "LayerHeader";

const LayerTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "text-base font-Roobert tracking-normal font-semibold md:w-64",
      className
    )}
    {...props}
  />
));
LayerTitle.displayName = "LayerTitle";

const LayerDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-white text-opacity-70 md:w-64", className)}
    {...props}
  />
));
LayerDescription.displayName = "LayerDescription";

// Horizontal descriptions
function HorizontalLayerDescription({
  children,
  className,
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <ScrollArea className="w-full md:hidden">
      <div className="self-stretch justify-start items-start inline-flex">
        <div className="w-64 px-5 pt-4 pb-5 flex-col justify-start items-start gap-5 inline-flex">
          <Image
            src="/img/central-icons/compass-square.svg"
            alt=""
            className="size-[24px]"
            width={24}
            height={24}
          />
          <div className="self-stretch text-white text-base font-medium leading-none">
            1. Your website
          </div>
          <div className="self-stretch opacity-70 text-white text-sm font-normal leading-snug">
            Deploy your website to the edge with Vercel, Netlify, or any other
            static site host.
          </div>
        </div>

        <GradientSeparator orientation="vertical" className="mx-3" />

        <div className="w-64 px-5 pt-4 pb-5 flex-col justify-start items-start gap-5 inline-flex">
          <Image
            src="/img/central-icons/code-brackets.svg"
            alt=""
            className="size-[24px]"
            width={24}
            height={24}
          />
          <div className="self-stretch text-white text-base font-medium leading-none">
            2. Website codebase
          </div>
          <div className="self-stretch opacity-70 text-white text-sm font-normal leading-snug">
            Build your website with your design and your favorite frontend
            framework, like Next.js or Vue.
          </div>
        </div>

        <GradientSeparator orientation="vertical" className="mx-3" />

        <div className="w-64 px-5 pt-4 pb-5 flex-col justify-start items-start gap-5 inline-flex">
          <Image
            src="/img/central-icons/plugin.svg"
            alt=""
            className="size-[24px]"
            width={24}
            height={24}
          />
          <div className="self-stretch text-white text-base font-medium leading-none">
            3. NotCMS API
          </div>
          <div className="self-stretch opacity-70 text-white text-sm font-normal leading-snug">
            Leverage the power of NotCMS's fast API. Retrieve your content with
            typed queries.
          </div>
        </div>

        <GradientSeparator orientation="vertical" className="mx-3" />

        <div className="w-64 px-5 pt-4 pb-5 flex-col justify-start items-start gap-5 inline-flex">
          <Image
            src="/img/central-icons/dashboard-low.svg"
            alt=""
            className="size-[24px]"
            width={24}
            height={24}
          />
          <div className="self-stretch text-white text-base font-medium leading-none">
            4. NotCMS Dashboard
          </div>
          <div className="self-stretch opacity-70 text-white text-sm font-normal leading-snug">
            Manage your databases with a powerful and intuitive dashboard, with
            features like version history.
          </div>
        </div>

        <GradientSeparator orientation="vertical" className="mx-3" />

        <div className="w-64 px-5 pt-4 pb-5 flex-col justify-start items-start gap-5 inline-flex">
          <Image
            src="/img/central-icons/server-2.svg"
            alt=""
            className="size-[24px]"
            width={24}
            height={24}
          />
          <div className="self-stretch text-white text-base font-medium leading-none">
            5. Notion editor / database
          </div>
          <div className="self-stretch opacity-70 text-white text-sm font-normal leading-snug">
            Edit your content in Notion, and sync it to your website with a few
            click.
          </div>
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
