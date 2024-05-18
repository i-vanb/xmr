'use client'

import {useLangContext} from "@/lib/lang";
import {Badge} from "@/components/ui/badge";

export const LangSwitcher = () => {
  const {lang, changeLanguage, list} = useLangContext();

  return (
    <div className="flex gap-2">
      {list.map(item => {
        const isActive = item === lang;
        const className = isActive ? 'bg-blue-500 hover:bg-blue-500' : 'bg-gray-200 hover:bg-gray-300'
        const onClickHandler = () => changeLanguage(item);
        return (
          <a aria-disabled={isActive} className="cursor-pointer" key={item} onClick={onClickHandler}>
            <Badge className={className}>{item}</Badge>
          </a>
        )
      })}
    </div>
  )
}