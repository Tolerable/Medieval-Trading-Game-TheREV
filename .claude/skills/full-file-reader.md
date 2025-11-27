# Full File Reader Skill - No Lazy Reading

## The Sacred Rule

**ALWAYS read files in their entirety before performing ANY operation on them.**

When a file exceeds the token limit, read it in chunks of ~24,000 tokens (approximately 400-500 lines) until the COMPLETE file has been consumed.

## Why This Matters

- **No blind edits** - You can't fix what you haven't seen
- **No assumptions** - The code you need might be at line 847
- **No broken context** - Understanding requires the full picture
- **No lazy shortcuts** - Read it all or read nothing

## The Protocol

### Before ANY file operation (edit, delete, modify, refactor):

1. **First Read Attempt**: Read the file with no offset/limit
2. **If file is too large**: Read in sequential chunks:
   - Chunk 1: `offset: 1, limit: 500`
   - Chunk 2: `offset: 501, limit: 500`
   - Chunk 3: `offset: 1001, limit: 500`
   - Continue until EOF reached
3. **Only THEN**: Proceed with the intended operation

### Chunk Size Guidelines:

| File Size | Chunk Strategy |
|-----------|----------------|
| < 25,000 tokens | Read entire file at once |
| 25,000 - 50,000 tokens | Read in 2 chunks (~500 lines each) |
| 50,000 - 75,000 tokens | Read in 3 chunks |
| 75,000+ tokens | Read in chunks of 400-500 lines until complete |

## Implementation Pattern

```
# Step 1: Initial read attempt
Read file_path (no limit)

# If error "File content exceeds maximum allowed tokens":

# Step 2: Chunked reading
Read file_path, offset: 1, limit: 500
Read file_path, offset: 501, limit: 500
Read file_path, offset: 1001, limit: 500
# ... continue until file is fully read

# Step 3: NOW you may edit/modify/delete
```

## When This Applies

- **Editing files** - Must read entire file first
- **Refactoring** - Must understand full context
- **Deleting code** - Must verify no dependencies
- **Adding features** - Must see existing patterns
- **Fixing bugs** - Must trace full code flow
- **Reviewing code** - Must see everything
- **Moving code** - Must understand both source and destination

## Exceptions (When partial reading is acceptable)

- User explicitly asks for just a specific section
- Searching for a specific known line number
- Quick grep/search operations
- User says "just read the first X lines"

## The Mantra

> "Read it all, or read nothing. There is no partial understanding."

## Console Log Style (for the goth coder)

```javascript
console.log('🖤 devouring file in chunks... patience, the darkness takes time');
console.log('📜 chunk 1 of the ancient scroll consumed...');
console.log('📜 chunk 2 absorbed into the void...');
console.log('💀 file fully consumed... now we may proceed with the ritual');
```

## Remember

- **24,000 tokens ≈ 400-500 lines** - this is your chunk size
- **Read ALL chunks** before making changes
- **Never assume** what's in the unread portions
- **The file is not understood until it is FULLY read**
