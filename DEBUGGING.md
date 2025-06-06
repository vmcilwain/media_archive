# Debugging Guide for Media Archive Rails Application

This guide explains how to debug your Rails application using VSCode with the ruby_lsp extension.

## Prerequisites

- VSCode with the Ruby LSP extension installed
- The `debug` gem is already included in your Gemfile (development/test group)
- Node.js for JavaScript/TypeScript debugging

## Ruby/Rails Backend Debugging

### Available Debug Configurations

The `.vscode/launch.json` file includes several debugging configurations:

1. **Debug Rails Server** - Start Rails server in debug mode
2. **Debug Rails Console** - Launch Rails console with debugging
3. **Debug RSpec Tests** - Run all RSpec tests with debugging
4. **Debug Single RSpec File** - Debug the currently open RSpec file
5. **Attach to Rails Process** - Attach to an already running Rails process

### Setting Breakpoints

#### Method 1: Using `debugger` keyword

```ruby
# In any Ruby file (controllers, models, etc.)
def some_method
  debugger  # Execution will pause here
  # Your code continues...
end
```

#### Method 2: Using `binding.break`

```ruby
def another_method
  binding.break  # Alternative to debugger
  # Your code continues...
end
```

#### Method 3: Visual breakpoints

- Click in the gutter next to line numbers in VSCode
- Or press `F9` while cursor is on the line

### Common Debugging Scenarios

#### Controller Debugging

```ruby
# app/controllers/pages_controller.rb
class PagesController < ApplicationController
  def index
    debugger  # Pause execution here
    @media = Media.all
    # Inspect @media in the debug console
  end
end
```

#### Model Debugging

```ruby
# app/models/media.rb
class Media < ApplicationRecord
  def custom_method
    binding.break  # Pause here
    # Debug your model logic
  end
end
```

#### Test Debugging

```ruby
# spec/models/media_spec.rb
RSpec.describe Media, type: :model do
  it "does something" do
    media = create(:media)
    debugger  # Debug your test
    expect(media).to be_valid
  end
end
```

### Debug Controls

- **F5**: Continue execution
- **F10**: Step over (execute current line)
- **F11**: Step into (enter method calls)
- **Shift+F11**: Step out (exit current method)
- **Ctrl+Shift+F5**: Restart debugging session

### Debug Panels

1. **Variables**: View local variables, instance variables, and constants
2. **Call Stack**: See the execution path and navigate between stack frames
3. **Debug Console**: Execute Ruby code in the current context
4. **Breakpoints**: Manage all your breakpoints

## JavaScript/TypeScript Frontend Debugging

### Jest Test Debugging

Use the "Debug Jest Tests" or "Debug Jest Single Test" configurations to debug your React components and tests.

#### Example: Debugging a React Component Test

```typescript
// app/javascript/components/__tests__/Table.test.tsx
import { render, screen } from "@testing-library/react";
import Table from "../Table";

test("renders table correctly", () => {
  debugger; // This will pause execution in VSCode
  render(<Table data={[]} />);
  const tableElement = screen.getByRole("table");
  expect(tableElement).toBeInTheDocument();
});
```

### Browser Debugging

For debugging React components in the browser:

1. Start your Rails server: `bin/dev`
2. Open Chrome DevTools
3. Navigate to Sources tab
4. Set breakpoints in your TypeScript/JavaScript files
5. Source maps are already configured in your esbuild setup

## Debugging Workflow

### 1. Start a Debug Session

1. Open the Run and Debug panel (`Ctrl+Shift+D`)
2. Select your desired configuration from the dropdown
3. Press `F5` or click the green play button

### 2. Using the Debug Console

While debugging, you can execute Ruby code in the debug console:

```ruby
# Examples of what you can do in the debug console:
p local_variables        # List all local variables
p instance_variables     # List all instance variables
p self.class            # Check current object class
Media.count             # Execute ActiveRecord queries
params                  # Inspect controller parameters (in controller context)
```

### 3. Conditional Breakpoints

Right-click on a breakpoint to add conditions:

```ruby
# Breakpoint will only trigger when user_id equals 1
user_id == 1
```

### 4. Logpoints

Right-click in the gutter and select "Add Logpoint" for non-breaking debug output:

```ruby
# This will log to the debug console without stopping execution
"User ID: #{user_id}, Name: #{user.name}"
```

## Advanced Debugging Techniques

### Debugging Background Jobs

If you add background jobs later, you can debug them by:

1. Adding `debugger` in your job class
2. Using the "Attach to Rails Process" configuration
3. Running jobs in the foreground during development

### Debugging Database Queries

```ruby
# In any method where you want to see SQL queries
ActiveRecord::Base.logger = Logger.new(STDOUT)
debugger
User.where(active: true).to_a  # This will show the SQL query
```

### Debugging API Responses

```ruby
# In controller actions
def api_endpoint
  debugger
  data = { message: "Hello World" }
  render json: data  # Inspect the data before rendering
end
```

## Troubleshooting

### Common Issues

1. **Debugger not stopping**: Ensure the `debug` gem is installed and you're using `debugger` or `binding.break`

2. **Ruby LSP not working**: Check that the Ruby LSP extension is enabled and restart VSCode

3. **Breakpoints not hitting**: Make sure you're running the correct debug configuration

4. **Source maps not working**: Verify that your esbuild configuration includes `--sourcemap`

### Performance Tips

- Use conditional breakpoints to avoid stopping on every iteration
- Remove debugger statements before committing code
- Use logpoints for non-intrusive debugging

## Docker Debugging

Since your application runs in Docker, here's how to debug it:

### Setup (Already Configured)

1. **Debug port exposed**: Port 1234 is already exposed in your `docker-compose.yml`
2. **Debug configuration**: "Debug Rails in Docker" configuration is available in `.vscode/launch.json`

### Docker Debugging Workflow

1. **Start your Docker container with debug support**:

   ```bash
   # Start the container
   docker-compose up

   # In another terminal, start Rails with debug server
   docker-compose exec web bundle exec rdbg --open --host 0.0.0.0 --port 1234 -- bin/rails server
   ```

2. **Alternative: Modify your container startup**:
   Add this to your `docker-compose.yml` command (optional):

   ```yaml
   services:
     web:
       command: bundle exec rdbg --open --host 0.0.0.0 --port 1234 -- bin/rails server
   ```

3. **Attach VSCode debugger**:
   - Open Run and Debug panel (`Ctrl+Shift+D`)
   - Select "Debug Rails in Docker"
   - Press F5 to attach

### Setting Breakpoints in Docker

Use the same methods as local debugging:

- Add `debugger` or `binding.break` in your Ruby code
- Set visual breakpoints in VSCode
- Use conditional breakpoints and logpoints

### Docker-Specific Tips

- **Container logs**: Use `docker-compose logs -f web` to see Rails logs
- **Debug console**: Works the same way - execute Ruby code in current context
- **File changes**: Your code changes are reflected immediately due to volume mounting
- **Restart debugging**: If connection is lost, restart the debug server in the container

### Troubleshooting Docker Debugging

1. **Connection refused**: Ensure the debug server is running with `--host 0.0.0.0`
2. **Port conflicts**: Make sure port 1234 isn't used by other services
3. **Container not responding**: Check if the Rails server started successfully
4. **Breakpoints not hitting**: Verify the debug server is attached and running

## Best Practices

1. **Remove debug statements**: Always remove `debugger` and `binding.break` before committing
2. **Use descriptive breakpoint conditions**: Make conditional breakpoints clear and specific
3. **Leverage the debug console**: Use it to test hypotheses and explore object state
4. **Combine with logging**: Use Rails logger alongside debugging for comprehensive troubleshooting
5. **Debug tests first**: Often easier to debug failing tests than running application scenarios

## Keyboard Shortcuts Summary

- `F5`: Start debugging / Continue
- `F9`: Toggle breakpoint
- `F10`: Step over
- `F11`: Step into
- `Shift+F11`: Step out
- `Ctrl+Shift+F5`: Restart debugging
- `Shift+F5`: Stop debugging
- `Ctrl+Shift+D`: Open Run and Debug panel

Happy debugging! 🐛🔍
