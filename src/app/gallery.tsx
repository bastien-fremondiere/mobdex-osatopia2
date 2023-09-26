"use client";
import Image from 'next/image'
import ALTERED from '../altered'
import { useState, useEffect } from 'react';

type AlteredEntity =
    {
        name: string;
        entityId: number,
        order: number,
        rarity: number
    };

function AlteredIcon({ name, entityId, order, rarity }: AlteredEntity) {
    const [selected, setSelected] = useState(localStorage.getItem("selected-" + entityId) === "true" ? true : false);
    const [chroma, setChroma] = useState(localStorage.getItem("chroma-" + entityId) === "true" ? true : false);
    useEffect(() => {
        localStorage.setItem("selected-" + entityId, selected ? "true" : "false");
    }, [selected]);

    useEffect(() => {
        localStorage.setItem("chroma-" + entityId, selected ? "true" : "false");
    }, [chroma]);
    return (
        <div style={{
            width: 150,
            height: 150
        }}
            className={"relative block hover:cursor-pointer rounded-lg bg-zinc-900 hover:bg-zinc-800 box-border duration-100 " + (selected ? "border-solid border-2 border-sky-500" : "")} >
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
                height={150} />
        </div >
    )
}

export default function Gallery() {
    return (
        <div className="flex w-10/12 flex-wrap align-middle gap-y-6 gap-x-6">
            {ALTERED.map(altered => {
                return (
                    <AlteredIcon {...altered} />
                )
            })}
        </div>
    );
}