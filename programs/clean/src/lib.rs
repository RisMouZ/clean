use anchor_lang::prelude::*;

declare_id!("EWDAaD1x8rQ76uf4bJuXRxqXepBrhPH8ZQ5jw5ddFCfH");

#[program]
pub mod clean {
    use super::*;

    pub fn init_user(_ctx: Context<InitUser>) -> Result<()> {
        _ctx.accounts.user.raffle_count = 0;
        _ctx.accounts.user.win_count = 0;

        msg!(
            "User account have create {} raffles",
            _ctx.accounts.user.raffle_count
        );
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitUser<'info> {
    #[account(
        init,
        payer = signer,
        space = 8 + 4 + 2 + 1,
        seeds = [signer.key().as_ref()],
        bump
        )]
    pub user: Account<'info, User>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct User {
    raffle_count: u32,
    win_count: u16,
}
