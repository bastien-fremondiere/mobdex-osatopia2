"use client";
import Image from 'next/image'
import ALTERED from '../altered'
import { useLocalStorage } from 'usehooks-ts'
import { useEffect } from 'react';

type AlteredEntity =
    {
        name: string;
        entityId: number,
        order: number,
        rarity: number,
        hideSelected: boolean,
        chromaImg: any,
        normalImg: any
    };

function AlteredIcon({ name, entityId, order, chromaImg, normalImg, rarity, hideSelected }: AlteredEntity) {
    const selectKey = "selected-" + entityId;
    const chromaKey = "chroma-" + entityId;
    const [selected, setSelected] = useLocalStorage(selectKey, false);
    const [chroma, setChroma] = useLocalStorage(chromaKey, false);
    /**
     * Initialize if necessary
     */
    useEffect(() => {
        if (!localStorage.getItem(selectKey)) {
            setSelected(false);
        }
        if (!localStorage.getItem(chromaKey)) {
            setChroma(false);
        }
    }, [])
    return (
        <div style={{
            width: 150,
            height: 150
        }}
            key={order}
            className={"relative block hover:cursor-pointer rounded-lg bg-zinc-900 hover:bg-zinc-800 box-border duration-100 " + (selected ? "border-solid border-2 border-sky-500 " : "") + ((selected && hideSelected) ? " hidden" : "")
            } >
            <div className=' w-8 h-8 text-center text-lg bg-zinc-700 rounded-lg absolute z-20' onClick={() => setChroma(!chroma)}>{chroma ? "★" : "☆"}</div>
            <Image alt={name}
                className='absolute z-0 left-0 top-0'
                onClick={() => setSelected(!selected)}
                src={chromaImg}
                placeholder="blur" />
            <Image alt={name}
                className={'left-0 top-0 absolute z-10 duration-300 ' + (chroma ? "opacity-0" : "opacity-100")}
                onClick={() => setSelected(!selected)}
                src={normalImg}
                placeholder="blur" />
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
                        <AlteredIcon key={altered.order} {...altered} hideSelected={hideSelected} />
                    )
                })}
        </div>
    );
}