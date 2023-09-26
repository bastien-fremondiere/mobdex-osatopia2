"use client";
import Image from 'next/image'
import ALTERED from '../altered'
import { useState } from 'react';

type AlteredEntity =
    {
        name: string;
        entityId: number,
        order: number,
        rarity: number
    };

function AlteredIcon({ name, entityId, order, rarity }: AlteredEntity) {
    const [selected, setSelected] = useState(false);
    return (
        <Image className="flex " alt={name}
            onClick={() => setSelected(!selected)}
            src={"/altered/" + entityId + "." + (selected ? "Chroma" : "Normal") + ".png"}
            width={150}
            height={150} />
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