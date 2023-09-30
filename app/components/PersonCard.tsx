function PersonCard({ name, onClick }: { name: string; onClick: () => void }) {
  return (
    <div className="person-card" onClick={onClick}>
      <h3>{name}</h3>
    </div>
  );
}

export default PersonCard;
