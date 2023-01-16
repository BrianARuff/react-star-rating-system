##  NPM Link
[React Star Rating System](https://www.npmjs.com/package/react-star-rating-system)

## App Description
Created and published a reusable star rating voting system package using ReactJS, available through NPM
for other developers to easily integrate into their web projects. The package includes customizable hover and
on-click events, providing a seamless user experience. Developers can retrieve and display the ratings in a
variety of ways, making it a versatile and useful tool for any web project that requires a rating feature.


## React Star Rating System Docs

   * Component Name: StarRatingSystem
   * Component Interface:
      *  hoverColor: string; // yellow
      *  clickColor: string; // gold
      *  defaultColor: string; // lightGray
      *  numberOfStars: number; // 5
      *  svg: {
                width: string;
                height: string;
                viewBox: string;
                svgProps: { ...rest } // any component props;
                pathProps: { ...rest } // any component props;
          }; // default undefined... Allows you to customize the SVG being used.
      *  container: ReactNode | ReactNode[]; // undefined
      *  customClick: (clickRating?: number) => void; // () => {}... Allows you to perform custom behaviour on click
      *  customHover: (hoverRating?: number) => void; // () => {}... Allows you to perform custom behaviour on hover (like a network call)
      *  customSubmit: (rating?: number) => void // undefined, relies on isCustomSubmit to be true to work... Allows you to perform custom behaviour on submit, like if you wanted to submit the rating result at a later time and attach to your own click handler
      *  defaultRating: number; // default 0
      *  shouldResetWhenNotHovered: boolean // false... resets stars to default color and rating (doesn't work if you provide a default rating)
      *  shouldResetWhenNotClicked: boolean; // false... resets starts to default color and rating when you click on something that isn't stars themself (doesn't apply if you provide defaultRating)
      *  isCustomSubmit: boolean; // false, I recommend setting this props with a click handler rather than using a plain boolean value. You could do the below:
      *    const handleClick = (val) => {
                setIsCustomSubmit(true); // if defaultRating is set in the customSubmit function, then you don't need to setIsCustomSubmit back to false
                // if you don't use defaultRating prop after submitting, then you'll need to find a way to set isCustomSubmit back to false to prevent the UI from re-rendering over and over an infinite amount of times... Here is one way to do that, by adding this code to this function.
                    setTimeout(() => {
                      setIsCustomSubmit(false);
                    }, 0);
                };


---

### Example of Package Being Used

```
export default function App() {
  const [data, setData] = useState({title: '', id: 0});
  const [rating, setRating] = useState(0);
  const [isCustomSubmit, setIsCustomSubmit] = useState(false);

  const customClick = async (clickRating: number) => {
    console.log("click", clickRating);

    if (clickRating) {
      fetch(
        // must await the custom click function at the declaration level too
        "https://jsonplaceholder.typicode.com/todos/" + clickRating
      )
        .then((response) =>
          response.json().then((r) => {
            console.log(r);
            setData(r);
            setRating(clickRating);
          })
        )
        .then((json) => console.log(json));

      return console.log(clickRating);
    }
  };

  const customSubmit = async (rating: number) => {
    console.log("submit", rating);

    if (rating) {
      fetch(
        // must await the custom click function at the declaration level too
        "https://jsonplaceholder.typicode.com/todos/" + rating
      )
        .then((response) =>
          response.json().then((r) => {
            console.log(r);
            setData(r);
            setRating(rating);
          })
        )
        .then((json) => console.log(json));

      return console.log(rating);
    }
  };

  const customHover = async (hoverRating: number) => {
    console.log("hover", hoverRating);

    if (hoverRating) {
      return fetch(
        "https://jsonplaceholder.typicode.com/todos/" + hoverRating
      ).then((response) =>
        response.json().then((r) => {
          console.log(r);
        })
      );
    }
  };

  const handleClick = () => {
    setIsCustomSubmit(true);
    setTimeout(() => {
      setIsCustomSubmit(false);
    }, 0); // since it's wrapped in a timeout, it sets it to false after the render, giving the prop time to be true until the submit function is completed.
  };

  return (
    <>
      <h1>Title: {data?.title as string}</h1>
      <p>ID: {data?.id}</p>
      <StarRatingSystem
        defaultRating={rating}
        isCustomSubmit={isCustomSubmit}
        customSubmit={customSubmit}
        shouldResetWhenNotClicked
        shouldResetWhenNotHovered
        container={Container}
      />
      <br />
      <br />
      <button onClick={handleClick}>Submit</button>
    </>
  );
}

const Container = ({children}: any) => {
  return <span id="star-container-out">{children}</span>;
};
