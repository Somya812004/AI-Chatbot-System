def apply_advanced_filters(df, filters):
    if 'location' in filters and filters['location']:
        df = df[df['Location'].str.contains(filters['location'], case=False, na=False)]
    
    if 'industry' in filters and filters['industry']:
        df = df[df['Industry'].str.contains(filters['industry'], case=False, na=False)]
        
    if 'type' in filters and filters['type']:
        # e.g. Startups, MNCs
        if 'CompanyType' in df.columns:
            df = df[df['CompanyType'].str.contains(filters['type'], case=False, na=False)]
            
    if 'package' in filters and filters['package']:
        # Assuming package is a numeric column or parseable string
        pass
        
    return df
