interface PropsHeaderPageDash {
  titulo: string;
  subtitulo: string;
}

export const HeaderPageDashboard = ({titulo, subtitulo} : PropsHeaderPageDash) => {
  return (
    <div>

      <div className="ml-1">
        <h1
          className={`font-medium text-2xl text-[#010101]`}
        >
          {titulo}
        </h1>
      </div>
    </div>
  );
};
