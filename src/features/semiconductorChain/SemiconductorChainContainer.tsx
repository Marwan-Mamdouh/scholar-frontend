import { FC } from "react";
import SemiconductorPyramidClient from "./SemiconductorPyramidClient";
import LayerInfoCard from "./LayerInfoCard";
import LayerDetail from "./LayerDetail";
import ChainFlow from "./ChainFlow";
import { SEMICONDUCTOR_LAYERS } from "./semiconductorChain.data";
import { LayerId } from "./semiconductorChain.type";

const SemiconductorChainContainer: FC<{ activeLayer: LayerId }> = ({ activeLayer }) => {
  const activeIndex = SEMICONDUCTOR_LAYERS.findIndex((layer) => layer.id === activeLayer);
  const layer = SEMICONDUCTOR_LAYERS[activeIndex];

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-12 pt-8 pb-24 px-4 md:px-8 tracking-eyebrow">
      <SemiconductorPyramidClient activeLayer={activeLayer} />

      <div className="flex flex-col gap-8">
        <LayerInfoCard layer={layer} />
        <LayerDetail
          layer={layer}
          previousLayer={SEMICONDUCTOR_LAYERS[activeIndex - 1]}
          nextLayer={SEMICONDUCTOR_LAYERS[activeIndex + 1]}
        />
      </div>

      <ChainFlow />
    </div>
  );
};

export default SemiconductorChainContainer;
