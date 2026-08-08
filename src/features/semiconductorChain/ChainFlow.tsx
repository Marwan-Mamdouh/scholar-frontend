import { FC } from "react";
import { CHAIN_FLOW_STEPS, getLayerById } from "./semiconductorChain.data";
import getToneClasses from "./semiconductorChain.style";

const ChainFlow: FC = () => {
  return (
    <section aria-labelledby="chain-flow-heading" className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 id="chain-flow-heading" className="text-h2-sm font-bold text-neutral-50">
          The order things actually happen
        </h2>
        <p className="text-subtext text-neutral-200 max-w-3xl">
          The pyramid ranks layers by how abstract they are, not by sequence. In production the
          bottom layer works at both ends: raw materials feed the fab before it starts, and
          packaging and assembly only begin once it finishes.
        </p>
      </div>

      <ol className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        {CHAIN_FLOW_STEPS.map((step) => {
          const primaryLayer = getLayerById(step.layers[0]);
          const tone = getToneClasses(primaryLayer.tone);

          return (
            <li
              key={step.step}
              className={`relative flex flex-col gap-3 rounded-2xl border-t-4 ${tone.border} bg-white/5 p-4.5`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${tone.bg} text-sm font-bold text-neutral-900`}
                >
                  {step.step}
                </span>
                <h3 className="text-h4-sm font-semibold text-neutral-50">{step.title}</h3>
              </div>

              <p className="text-subtext text-neutral-100 flex-1">{step.description}</p>

              <div className="flex flex-wrap gap-1.5">
                {step.layers.map((layerId) => {
                  const layer = getLayerById(layerId);
                  const layerTone = getToneClasses(layer.tone);

                  return (
                    <span
                      key={layerId}
                      className={`rounded-full ${layerTone.softBg} px-2.5 py-0.5 text-xs font-medium ${layerTone.softText}`}
                    >
                      Layer {layer.number}
                    </span>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default ChainFlow;
