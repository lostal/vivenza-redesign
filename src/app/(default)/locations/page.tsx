
import SectionTitle from '@/components/section-title';
import ExhibitionAccordion from '@/components/location/ExhibitionAccordion';
import { exhibitionData } from '@/lib/exhibition-data'; // Importar los datos parseados

export default function LocationsPage() {
  return (
    <div className="container py-12 md:py-16">
      <SectionTitle
        title="Nuestros Showrooms"
        description="Visítanos para experimentar la calidad Vivenza y obtener asesoramiento experto. Encuentra tu exposición más cercana:"
      />

      <div className="my-12">
        <ExhibitionAccordion data={exhibitionData} />
      </div>
      
      {/* El contenido anterior (mapa SVG y LocationCards) ha sido eliminado según la solicitud */}
    </div>
  );
}
