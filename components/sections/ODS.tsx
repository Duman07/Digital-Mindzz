import { TrendingUp, Users, Leaf, Globe2 } from 'lucide-react'

const impacts = [
  {
    Icon:        TrendingUp,
    title:       'Crecimiento económico',
    description: 'Impulsamos el crecimiento de MiPymes que generan empleo y mueven la economía local colombiana.',
    color:       '#F59E0B',
    stat:        'ODS 8',
  },
  {
    Icon:        Users,
    title:       'Trabajo decente',
    description: 'Ayudamos a empresas a crecer sin que la carga de trabajo caiga sobre sus empleados.',
    color:       '#10B981',
    stat:        'ODS 8',
  },
  {
    Icon:        Leaf,
    title:       'Innovación sostenible',
    description: 'Promovemos la industrialización inclusiva mediante tecnologías modernas y accesibles.',
    color:       '#06B6D4',
    stat:        'ODS 9',
  },
  {
    Icon:        Globe2,
    title:       'Reducción de desigualdades',
    description: 'Acercamos tecnología de punta a empresas que antes no podían acceder a soluciones digitales.',
    color:       '#7C3AED',
    stat:        'ODS 10',
  },
]

export default function ODS() {
  return (
    <section id="impacto" className="section-padding bg-dm-dark relative overflow-hidden">

      {/* Orbe verde */}
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"
           style={{ background: 'radial-gradient(circle, #10B981, transparent)' }} />

      <div className="container-dm relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="badge mb-4 inline-flex">
            <Globe2 className="w-3.5 h-3.5 text-dm-cyan" />
            <span>Impacto social</span>
          </div>
          <h2 className="section-title">
            <span className="text-white">Tecnología con </span>
            <span className="text-gradient">propósito</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Digital Mindz está comprometida con los Objetivos de Desarrollo Sostenible. Nuestra misión va más allá del código.
          </p>
        </div>

        {/* ODS Badge central */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 glass-dark rounded-2xl px-8 py-5 border border-dm-blue/20">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-black text-white"
                 style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)' }}>
              8
            </div>
            <div className="text-left">
              <div className="text-xs text-dm-gray mb-0.5 uppercase tracking-wider">ODS Principal</div>
              <div className="text-white font-bold text-lg">Trabajo decente y crecimiento económico</div>
            </div>
          </div>
        </div>

        {/* Impactos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {impacts.map(({ Icon, title, description, color, stat }) => (
            <div key={title} className="card-dm text-center group">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
                   style={{ background: `${color}20` }}>
                <Icon className="w-7 h-7" style={{ color }} />
              </div>
              <div className="badge mb-3 mx-auto w-fit" style={{ color, borderColor: `${color}40`, background: `${color}15` }}>
                {stat}
              </div>
              <h3 className="text-white font-bold mb-2">{title}</h3>
              <p className="text-dm-gray text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* Misión statement */}
        <div className="glass rounded-2xl p-8 md:p-10 text-center border border-emerald-500/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-3"
               style={{ background: 'linear-gradient(135deg, #10B981, transparent)' }} />
          <div className="relative z-10">
            <p className="text-lg md:text-xl text-dm-gray leading-relaxed max-w-3xl mx-auto">
              "Creemos que la tecnología es un <span className="text-white font-semibold">derecho</span>, no un privilegio.
              Cada MiPyme que digitalizamos es una empresa que crece, genera empleo y contribuye al desarrollo económico de Colombia."
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <span className="text-lg">🇨🇴</span>
              </div>
              <div className="text-left">
                <div className="text-white font-semibold text-sm">Equipo Digital Mindz</div>
                <div className="text-dm-gray text-xs">Ingenieros de Sistemas · Colombia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
