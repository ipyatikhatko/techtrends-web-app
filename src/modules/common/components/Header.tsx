import React from 'react'
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";

function Header() {
  return (
    <header className="z-40 bg-header fixed top-0 left-0 w-full h-[56px] border-b px-8">
      <div className="h-full w-full flex justify-between items-center">
        <div className="flex items-center">
          <h4 className="w-fit pr-8 border-r">TechTrends Ukraine</h4>
          <div className="flex items-center gap-2 ml-4">
            <Link href='/'>
              <Button variant='link'>Overview</Button>
            </Link>
            <Link href={'#'}>
              <Button variant='link'>Jobs search</Button>
            </Link>
            <Link href={'#'}>
              <Button variant='link'>About</Button>
            </Link>
          </div>
        </div>
        <ThemeToggle/>
      </div>
    </header>
  )
}

export default Header
