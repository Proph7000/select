import './project-description.css'

export function ProjectDescription() {
  return (
    <div className='description'>
      <h2>Project Overview</h2>

      <p>
        This project demonstrates a high-performance, accessible select
        component built with React and TypeScript. The select component is
        designed to handle large datasets efficiently while maintaining smooth
        user experience.
      </p>

      <h3>Select Component Features</h3>

      <ul>
        <li>
          <strong>Keyboard Navigation:</strong> Full keyboard support with arrow
          keys, Home, End, PageUp, PageDown for efficient navigation
        </li>

        <li>
          <strong>Search Functionality:</strong> Type to search through options
          with debounced search (700ms delay)
        </li>

        <li>
          <strong>Virtualization Ready:</strong> Optimized for handling large
          datasets (100,000+ options)
        </li>

        <li>
          <strong>Accessibility:</strong> ARIA-compliant with proper focus
          management and screen reader support
        </li>

        <li>
          <strong>Responsive Design:</strong> Adapts to window resizing with
          dynamic positioning
        </li>

        <li>
          <strong>Customizable:</strong> Flexible styling, positioning, and
          behavior options
        </li>

        <li>
          <strong>Performance:</strong> Efficient rendering with controlled
          state management
        </li>
      </ul>

      <h3>Examples</h3>

      <p>
        <strong>Left Select:</strong> Fetches data from API with real-time
        search and navigation
        <br />
        <strong>Right Select:</strong> Demonstrates performance with 100,000
        static options
      </p>

      <div className='local-dev-note'>
        <h4>Local Development Note</h4>

        <p>
          <strong>Important:</strong> For local development with the names API,
          you need to create your own test application on{' '}
          <>
            <a
              href='https://www.back4app.com/database/back4app/list-of-names-dataset/get-started/javascript/rest-api/fetch?objectClassSlug=all-names'
              target='_blank'
              rel='noopener noreferrer'
            >
              Back4App
            </a>
          </>
          . Production API keys are stored in GitHub Actions and only available
          during deployment.
        </p>
      </div>
    </div>
  )
}
