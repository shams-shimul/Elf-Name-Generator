const elfFirstNames = [
  "Aurora", "Blitzen", "Crispin", "Dazzle", "Evergreen", "Frost", "Fiesty", "Glimmer",
  "Holly", "Icicle", "Joyful", "Kringle", "Luna", "Merry", "Nutmeg",
  "Olwen", "Pine", "Quill", "Razzle", "Sparkle", "Tinsel", "Umbra",
  "Vixen", "Whisk", "Xylo", "Yule", "Zippy"
];

const elfLastNames = [
  "Applecheeks", "Arna", "Bells", "Candycane", "Dazzlebright", "Everbright", "Frostwhisk",
  "Gingersnap", "Hollyberry", "Icestorm", "Jovial", "Kindleflame", "Lightwhisper",
  "Merrysprout", "Nutcracker", "Oakenleaf", "Peppermint", "Quicksilver", "Raindrop",
  "Snowdust", "Twinkletoes", "Underwood", "Velvet", "Winterberry", "Xylospark",
  "Yuletide", "Zestwind"
];


/*
 * 🎅 Task:
 * - Generate an elf first and last name that matches the user’s first and last name initials, then display it on the screen.
 * - Example: if the user’s name is "John Doe," the elf name could be "Joyful Dazzle."
 * - Display the generated elf names in the "Registered Employees" list.
 */

/*
 * 🌟 Stretch Goals:
 * - Generate the elf names using an LLM API (like HuggingFace). 
 * - Don't save the same name twice. (not necessary for the normal task)
 * - Make sure to use Scrimba's environment variables feature so you don't expose your API key 
 */

const regNames = [] // two subarrays for firstnames, lastnames

// makeing the input fields 'required'
const fNameInput = document.getElementsByName("first-name")
fNameInput[0].setAttribute('required', true)
const lNameInput = document.getElementsByName("last-name")
lNameInput[0].setAttribute('required', true)
// attaching the button to the form
document.getElementById('generate-btn').setAttribute('form', 'form')

document.getElementById('form').addEventListener('submit', function () {
  generateElfName(event, this)
})

// button event handler
function generateElfName(event, form) {
  if (form.checkValidity()) {
    event.preventDefault()
    const fNameInit = fNameInput[0].value[0].toLowerCase()
    const lNameInit = lNameInput[0].value[0].toLowerCase()
    pickNameWithInitials(fNameInit, lNameInit)
  }
  fNameInput[0].value = ''
  lNameInput[0].value = ''
}

// generated non-repeated name with the provided initials
const pickNameWithInitials = (firstInit, lastInit) => {
  // make a list of fn-ln combinations with the initials
  const nameList = elfFirstNames.reduce((acc, firstName) => {
    if (firstName[0].toLowerCase() === firstInit) {
      const fullNames = elfLastNames.filter(lastName => lastName[0].toLowerCase() === lastInit).map(lastName => `${firstName} ${lastName}`)
      return acc.concat(fullNames)
    }
    return acc

  }, [])

  // check for non-repeated name and send for rendering UI
  const nonRepeatedName = nameList.find(name => {
    if (!regNames.includes(name)) {
      regNames.push(name)
      return name
    }
  })
  render(nonRepeatedName)
}

// render the UI with a valid non-repeated name
const render = (lastGeneratedName) => {
  if (lastGeneratedName) {
    document.getElementById('elf-name-display').innerText = lastGeneratedName
    document.getElementById('elf-names-list').innerHTML = regNames.map(name => `
    <li>${name}</li>
  `).join('')
  } else {
    document.getElementById('elf-name-display').innerText = '---- ----'
    alert('Sorry, all the names with these initials have already been registered!')
  }
}