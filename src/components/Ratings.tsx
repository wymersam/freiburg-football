export default function Ratings({ value }: { value: number }) {
  // value: 0-5, can be .5 steps
  const circles = [];
  for (let i = 1; i <= 5; i++) {
    if (value >= i) {
      circles.push(<span key={i} className="rating-circle full" />);
    } else if (value >= i - 0.5) {
      circles.push(<span key={i} className="rating-circle half" />);
    } else {
      circles.push(<span key={i} className="rating-circle empty" />);
    }
  }
  return <span className="rating-circles">{circles}</span>;
}
