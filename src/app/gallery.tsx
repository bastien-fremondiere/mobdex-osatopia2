"use client";
import Image from 'next/image'
import ALTERED from '../altered'
import { useState, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts'

type AlteredEntity =
    {
        name: string;
        entityId: number,
        order: number,
        rarity: number,
        hideSelected: boolean
    };

function AlteredIcon({ name, entityId, order, rarity, hideSelected }: AlteredEntity) {
    const [selected, setSelected] = useLocalStorage("selected-" + entityId, false);
    const [chroma, setChroma] = useLocalStorage("chroma-" + entityId, false);

    return (
        <div style={{
            width: 150,
            height: 150
        }}

            className={"relative block hover:cursor-pointer rounded-lg bg-zinc-900 hover:bg-zinc-800 box-border duration-100 " + (selected ? "border-solid border-2 border-sky-500 " : "") + ((selected && hideSelected) ? " hidden" : "")
            } >
            <div className=' w-8 h-8 text-center text-lg bg-zinc-700 rounded-lg absolute z-20' onClick={() => setChroma(!chroma)}>{chroma ? "★" : "☆"}</div>
            <Image alt={name}
                className='absolute z-0 left-0 top-0'
                onClick={() => setSelected(!selected)}
                src={"/altered/" + entityId + "." + "Chroma" + ".png"}

                width={150}
                height={150} />
            <Image alt={name}
                className={'left-0 top-0 absolute z-10 duration-300 ' + (chroma ? "opacity-0" : "opacity-100")}
                onClick={() => setSelected(!selected)}
                src={"/altered/" + entityId + "." + "Normal" + ".png"}
                width={150}
                height={150}
            />
            <div className="text-sm absolute right-0 bottom-0 z-20 bg-zinc-700 opacity-80 p-1 rounded-lg">{name}</div>
            <div className="text-sm absolute right-0 top-0 z-20 bg-zinc-700 opacity-80 p-1 rounded-lg">{order}</div>
        </div >
    )
}

export default function Gallery({ hideSelected }: any) {
    return (
        <div className="flex w-10/12 flex-wrap align-middle gap-y-6 gap-x-6">
            {ALTERED.filter((altered) => {
                if (hideSelected) {
                    return localStorage.getItem("selected-" + altered.entityId) === "false"
                } else {
                    return true;
                }
            })
                .map(altered => {
                    return (
                        <AlteredIcon {...altered} hideSelected={hideSelected} />
                    )
                })}
        </div>
    );
}