import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const archiveData = [
  {
    year: "2023",
    volume: "Volume 42",
    issues: [
      {
        title: "JOURNAL OF ADVANCED RESEARCH",
        volume: "Volume 42, Issue 1",
        date: "January 2023",
        articlesCount: 12,
      },
      {
        title: "JOURNAL OF ADVANCED RESEARCH",
        volume: "Volume 42, Issue 2",
        date: "March 2023",
        articlesCount: 14,
      },
      {
        title: "SPECIAL ISSUE\nJOURNAL OF ADVANCED RESEARCH",
        volume: "Volume 42, Issue 3",
        date: "May 2023",
        articlesCount: 18,
        specialLabel: "Artificial Intelligence in Healthcare",
        specialBg: "bg-teal-50 dark:bg-teal-900/20",
      },
      {
        title: "JOURNAL OF ADVANCED RESEARCH",
        volume: "Volume 42, Issue 4",
        date: "July 2023",
        articlesCount: 13,
      },
      {
        title: "JOURNAL OF ADVANCED RESEARCH",
        volume: "Volume 42, Issue 5",
        date: "September 2023",
        articlesCount: 15,
      },
      {
        title: "SUPPLEMENT\nJOURNAL OF ADVANCED RESEARCH",
        volume: "Volume 42, Supplement 1",
        date: "October 2023",
        articlesCount: 24,
        specialLabel: "Conference Proceedings: Global Research Summit 2023",
        specialBg: "bg-amber-50 dark:bg-amber-900/20",
      },
    ],
  },
  {
    year: "2022",
    volume: "Volume 41",
    issues: [
      {
        title: "JOURNAL OF ADVANCED RESEARCH",
        volume: "Volume 41, Issue 1",
        date: "January 2022",
        articlesCount: 10,
      },
      {
        title: "JOURNAL OF ADVANCED RESEARCH",
        volume: "Volume 41, Issue 2",
        date: "April 2022",
        articlesCount: 11,
      },
      {
        title: "SPECIAL ISSUE\nJOURNAL OF ADVANCED RESEARCH",
        volume: "Volume 41, Issue 3",
        date: "June 2022",
        articlesCount: 16,
        specialLabel: "Sustainability and Climate Change",
        specialBg: "bg-teal-50 dark:bg-teal-900/20",
      },
      {
        title: "JOURNAL OF ADVANCED RESEARCH",
        volume: "Volume 41, Issue 4",
        date: "September 2022",
        articlesCount: 14,
      },
      {
        title: "SUPPLEMENT\nJOURNAL OF ADVANCED RESEARCH",
        volume: "Volume 41, Supplement 1",
        date: "November 2022",
        articlesCount: 20,
        specialLabel: "Symposium on Emerging Technologies",
        specialBg: "bg-amber-50 dark:bg-amber-900/20",
      },
    ],
  },
  {
    year: "2021",
    volume: "Volume 40",
    issues: [
      {
        title: "JOURNAL OF ADVANCED RESEARCH",
        volume: "Volume 40, Issue 1",
        date: "February 2021",
        articlesCount: 9,
      },
      {
        title: "JOURNAL OF ADVANCED RESEARCH",
        volume: "Volume 40, Issue 2",
        date: "May 2021",
        articlesCount: 12,
      },
      {
        title: "SPECIAL ISSUE\nJOURNAL OF ADVANCED RESEARCH",
        volume: "Volume 40, Issue 3",
        date: "August 2021",
        articlesCount: 15,
        specialLabel: "Data Science and AI",
        specialBg: "bg-teal-50 dark:bg-teal-900/20",
      },
      {
        title: "JOURNAL OF ADVANCED RESEARCH",
        volume: "Volume 40, Issue 4",
        date: "November 2021",
        articlesCount: 13,
      },
    ],
  },
  {
    year: "2020",
    volume: "Volume 39",
    issues: [
      {
        title: "JOURNAL OF ADVANCED RESEARCH",
        volume: "Volume 39, Issue 1",
        date: "January 2020",
        articlesCount: 8,
      },
      {
        title: "JOURNAL OF ADVANCED RESEARCH",
        volume: "Volume 39, Issue 2",
        date: "April 2020",
        articlesCount: 10,
      },
      {
        title: "SPECIAL ISSUE\nJOURNAL OF ADVANCED RESEARCH",
        volume: "Volume 39, Issue 3",
        date: "July 2020",
        articlesCount: 14,
        specialLabel: "Pandemic Response and Public Health",
        specialBg: "bg-teal-50 dark:bg-teal-900/20",
      },
      {
        title: "JOURNAL OF ADVANCED RESEARCH",
        volume: "Volume 39, Issue 4",
        date: "October 2020",
        articlesCount: 12,
      },
      {
        title: "SUPPLEMENT\nJOURNAL OF ADVANCED RESEARCH",
        volume: "Volume 39, Supplement 1",
        date: "December 2020",
        articlesCount: 18,
        specialLabel: "Virtual Conference Proceedings 2020",
        specialBg: "bg-amber-50 dark:bg-amber-900/20",
      },
    ],
  },
];

export default function ArchivesHeader() {
  return (
    <section className="max-w-6xl mx-auto p-6 space-y-6 font-sans text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Journal Archives</h1>
        <p className="text-muted-foreground">
          Access all published issues from 1985 to present
        </p>
      </header>

      {/* Navigation Buttons */}
      <nav className="flex gap-4 text-sm font-semibold text-teal-700 dark:text-teal-400">
        <Button variant="link" className="hover:underline p-0">
          All Issues
        </Button>
        <Button variant="link" className="hover:underline p-0">
          Special Issues
        </Button>
        <Button variant="link" className="hover:underline p-0">
          Supplements
        </Button>
      </nav>

      {/* Accordion for each year */}
      <Accordion type="single" collapsible className="mt-6 space-y-4">
        {archiveData.map(({ year, volume, issues }) => (
          <AccordionItem
            key={year}
            value={`volume-${volume.replace(/\s+/g, "-").toLowerCase()}-${year}`}
          >
            <AccordionTrigger className="bg-slate-50 px-4 py-3 hover:no-underline">
              <h2 className="text-xl font-semibold">
                {year} ({volume})
              </h2>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {issues.map(
                  ({
                    title,
                    volume,
                    date,
                    articlesCount,
                    specialLabel,
                    specialBg,
                  }) => (
                    <IssueCard
                      key={volume}
                      title={title}
                      volume={volume}
                      date={date}
                      articlesCount={articlesCount}
                      specialLabel={specialLabel}
                      specialBg={specialBg}
                    />
                  )
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Other Volumes Summary */}
      <section className="mt-12 space-y-4 text-muted-foreground">
        <p>Earlier Volumes (1985-2019)</p>
      </section>
    </section>
  );
}

function IssueCard({
  title,
  volume,
  date,
  articlesCount,
  specialLabel,
  specialBg,
}) {
  return (
    <article
      className={`border border-teal-300 dark:border-teal-700 rounded-md p-5 shadow-sm hover:shadow-lg transition whitespace-pre-line ${
        specialBg || "bg-white dark:bg-gray-800"
      }`}
    >
      <h3 className="font-bold text-lg leading-tight tracking-wide text-teal-900 dark:text-teal-300">
        {title}
        <br />
        <span className="uppercase tracking-widest">{volume}</span>
      </h3>
      <p className="text-sm text-teal-700 dark:text-teal-400 mb-1">{date}</p>
      {specialLabel && (
        <p className="text-sm italic font-semibold mb-1 text-teal-600 dark:text-teal-300">
          {specialLabel}
        </p>
      )}
      <p className="text-sm font-medium mb-3 text-teal-800 dark:text-teal-200">
        {articlesCount} Articles
      </p>
      <Button
        variant="link"
        size="sm"
        className="text-teal-700 hover:underline p-0 dark:text-teal-400"
      >
        View Issue
      </Button>
    </article>
  );
}
