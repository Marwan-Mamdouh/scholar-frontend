"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SemiconductorPyramid from "./SemiconductorPyramid";
import { SEMICONDUCTOR_LAYERS } from "./semiconductorChain.data";
import { LayerId } from "./semiconductorChain.type";

interface SemiconductorPyramidClientProps {
  activeLayer: LayerId;
}

export default function SemiconductorPyramidClient({
  activeLayer,
}: Readonly<SemiconductorPyramidClientProps>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLayerChange = (layer: LayerId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("layer", layer);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <SemiconductorPyramid
      layers={SEMICONDUCTOR_LAYERS}
      activeLayer={activeLayer}
      onLayerChange={handleLayerChange}
    />
  );
}
